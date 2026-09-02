"use client";

import { useEffect, useRef } from "react";

/**
 * Hero 背景：three.js 写实风「昙花一现」绽放。
 * - 花瓣由 THREE.Shape 勾出、按层径向排布；bloom 参数 0→1 驱动 花苞→盛开→凋谢→花苞 的循环。
 * - 含发光花蕊、中心光晕，以及少量暖色微尘衬托氛围（承接原 HeroEmber 的火山余烬基调）。
 * 性能与可访问性（同 HeroEmber）：
 * - 动态 import('three')，不进 SSR；DPR≤2；离屏/隐藏/关闭动效时暂停 RAF。
 * - prefers-reduced-motion 或 html[data-motion="off"] 时仅渲染单帧「盛开」静态画面。
 * - 跟随明/暗主题切换混合模式与不透明度。
 */
export function HeroBloom({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionOff = () => document.documentElement.getAttribute("data-motion") === "off";
    let disposed = false;
    let renderer: import("three").WebGLRenderer | null = null;
    let frame = 0;
    let paused = reduceMotion || motionOff();
    const cleanupFns: Array<() => void> = [];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const easeInOut = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

    // 单周期：绽放 → 盛开停留 → 凋谢 → 花苞停留（模拟「昙花一现」）
    const OPEN = 4.5;
    const HOLD1 = 7;
    const CLOSE = 4.5;
    const HOLD0 = 3;
    const CYCLE = OPEN + HOLD1 + CLOSE + HOLD0;
    const bloomAt = (t: number) => {
      const p = ((t % CYCLE) + CYCLE) % CYCLE;
      if (p < OPEN) return easeInOut(p / OPEN);
      if (p < OPEN + HOLD1) return 1;
      if (p < OPEN + HOLD1 + CLOSE) return 1 - easeInOut((p - OPEN - HOLD1) / CLOSE);
      return 0;
    };

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const parent = canvas.parentElement ?? canvas;
      const getSize = () => {
        const r = parent.getBoundingClientRect();
        return { w: Math.max(1, r.width), h: Math.max(1, r.height) };
      };
      let { w, h } = getSize();

      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch {
        return; // 不支持 WebGL 的环境静默跳过
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 300);
      camera.position.set(0, 0, 62);

      // 花瓣纹理：中心暖白 → 边缘透明的径向渐变
      const petalTex = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 128;
        const ctx = c.getContext("2d")!;
        const g = ctx.createRadialGradient(64, 100, 4, 64, 64, 80);
        g.addColorStop(0, "rgba(255,250,238,0.98)");
        g.addColorStop(0.35, "rgba(255,238,228,0.85)");
        g.addColorStop(0.8, "rgba(255,226,236,0.32)");
        g.addColorStop(1, "rgba(255,226,236,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(c);
      })();

      // 光晕 / 花蕊尖端 纹理
      const glowTex = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 128;
        const ctx = c.getContext("2d")!;
        const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        g.addColorStop(0, "rgba(255,244,222,0.6)");
        g.addColorStop(0.5, "rgba(255,214,176,0.18)");
        g.addColorStop(1, "rgba(255,200,160,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(c);
      })();

      const flower = new THREE.Group();
      flower.position.set(0, 2, 0);
      scene.add(flower);

      const petalMat = new THREE.MeshBasicMaterial({
        map: petalTex,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        opacity: 1,
      });

      const makePetalShape = (len: number, wid: number) => {
        const s = new THREE.Shape();
        s.moveTo(0, 0);
        s.bezierCurveTo(wid * 0.55, len * 0.28, wid * 0.5, len * 0.78, 0, len);
        s.bezierCurveTo(-wid * 0.5, len * 0.78, -wid * 0.55, len * 0.28, 0, 0);
        return s;
      };

      type Petal = {
        tilt: import("three").Group;
        closedX: number;
        openX: number;
        openScale: number;
        sway: number;
        phase: number;
      };
      const petals: Petal[] = [];

      // 每层：count 片花瓣，从花心(+Y)向外生长；bloom 由 closedX(花苞, 指向相机)→openX(平铺朝外) 驱动
      const CLOSED = -Math.PI / 2;
      const addLayer = (
        count: number,
        len: number,
        wid: number,
        openTilt: number,
        openScale: number,
        offset: number,
      ) => {
        for (let i = 0; i < count; i++) {
          const pivot = new THREE.Group();
          pivot.rotation.z = (i / count) * Math.PI * 2 + offset;
          const tilt = new THREE.Group();
          tilt.rotation.x = CLOSED;
          const geo = new THREE.ShapeGeometry(makePetalShape(len, wid), 20);
          const mesh = new THREE.Mesh(geo, petalMat);
          tilt.add(mesh); // 基部位于花心(0,0,0)，沿 +Y 生长
          pivot.add(tilt);
          flower.add(pivot);
          petals.push({
            tilt,
            closedX: CLOSED,
            openX: openTilt,
            openScale,
            sway: 0.04 + Math.random() * 0.05,
            phase: Math.random() * Math.PI * 2,
          });
        }
      };
      addLayer(11, 16, 5.2, -0.05, 1.0, 0);
      addLayer(9, 12.5, 4.6, -0.22, 0.92, Math.PI / 9);
      addLayer(7, 8.5, 3.8, -0.5, 0.8, Math.PI / 7);

      // 花蕊：细丝 + 发光尖端，整体随 bloom 缩放
      const stamens = new THREE.Group();
      const stamenMat = new THREE.MeshBasicMaterial({
        color: 0xfff0d8,
        transparent: true,
        opacity: 0.9,
      });
      const tipMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xffe6b0,
      });
      const STN = 16;
      for (let i = 0; i < STN; i++) {
        const g = new THREE.Group();
        g.rotation.z = (i / STN) * Math.PI * 2;
        g.rotation.x = -0.18;
        const len = 7 + Math.random() * 2;
        const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.1, len, 6), stamenMat);
        cyl.position.y = len / 2;
        g.add(cyl);
        const tip = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7), tipMat);
        tip.position.y = len;
        g.add(tip);
        stamens.add(g);
      }
      flower.add(stamens);

      // 中心光晕
      const haloMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.5,
      });
      const halo = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), haloMat);
      halo.position.z = -3;
      flower.add(halo);

      // 暖色微尘（承接余烬基调，少量、缓慢）
      const MOTES = 140;
      const mPos = new Float32Array(MOTES * 3);
      const mBaseX = new Float32Array(MOTES);
      const mSpeed = new Float32Array(MOTES);
      const mPhase = new Float32Array(MOTES);
      const mSway = new Float32Array(MOTES);
      const top = 34;
      const bottom = -34;
      const spanX = 54;
      const spanZ = 26;
      for (let i = 0; i < MOTES; i++) {
        const x = (Math.random() * 2 - 1) * spanX;
        const y = Math.random() * (top - bottom) + bottom;
        const z = (Math.random() * 2 - 1) * spanZ;
        mPos[3 * i] = x;
        mPos[3 * i + 1] = y;
        mPos[3 * i + 2] = z;
        mBaseX[i] = x;
        mSpeed[i] = 1 + Math.random() * 2.5;
        mPhase[i] = Math.random() * Math.PI * 2;
        mSway[i] = 0.6 + Math.random() * 1.8;
      }
      const mGeo = new THREE.BufferGeometry();
      mGeo.setAttribute("position", new THREE.BufferAttribute(mPos, 3));
      const mMat = new THREE.PointsMaterial({
        size: 1.6,
        map: glowTex,
        color: 0xffd9a0,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 0.5,
      });
      const motes = new THREE.Points(mGeo, mMat);
      scene.add(motes);

      const applyTheme = () => {
        const dark = document.documentElement.classList.contains("dark");
        petalMat.opacity = dark ? 0.95 : 0.82;
        petalMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        petalMat.needsUpdate = true;
        tipMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        tipMat.needsUpdate = true;
        haloMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        haloMat.needsUpdate = true;
        mMat.opacity = dark ? 0.5 : 0.3;
        mMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        mMat.needsUpdate = true;
      };
      applyTheme();
      const themeObs = new MutationObserver(applyTheme);
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      cleanupFns.push(() => themeObs.disconnect());

      const update = (bloom: number, t: number) => {
        for (const p of petals) {
          const tiltX =
            lerp(p.closedX, p.openX, bloom) + Math.sin(t * 0.6 + p.phase) * p.sway * (0.4 + bloom);
          p.tilt.rotation.x = tiltX;
          p.tilt.scale.setScalar(lerp(0.32, p.openScale, bloom));
        }
        stamens.scale.setScalar(lerp(0.2, 1, bloom));
        stamens.rotation.y = t * 0.3;
        haloMat.opacity = 0.2 + bloom * 0.5;
        halo.scale.setScalar(lerp(26, 48, bloom));
        flower.rotation.z = Math.sin(t * 0.05) * 0.12 + t * 0.01;
        flower.position.y = 2 + Math.sin(t * 0.5) * 0.8;
      };

      const startTime = performance.now();
      const renderFrame = (bloom: number, t: number) => {
        update(bloom, t);
        renderer!.render(scene, camera);
      };

      const loop = () => {
        frame = requestAnimationFrame(loop);
        const now = performance.now();
        const t = (now - startTime) / 1000;
        renderFrame(bloomAt(t), t);
      };

      if (paused) {
        renderFrame(1, 0); // 静态盛开单帧
      } else {
        frame = requestAnimationFrame(loop);
      }

      let running = !paused;
      const startLoop = () => {
        if (paused || running) return;
        running = true;
        frame = requestAnimationFrame(loop);
      };
      const stopLoop = () => {
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
        running = false;
      };

      const io = new IntersectionObserver(
        ([entry]) => {
          if (paused) return;
          if (entry.isIntersecting && !document.hidden) startLoop();
          else stopLoop();
        },
        { threshold: 0 },
      );
      io.observe(canvas);
      cleanupFns.push(() => io.disconnect());

      const onVis = () => {
        if (paused) return;
        if (document.hidden) stopLoop();
        else startLoop();
      };
      document.addEventListener("visibilitychange", onVis);
      cleanupFns.push(() => document.removeEventListener("visibilitychange", onVis));

      // 跟随站点动效开关：关闭时定格盛开静态帧，开启时恢复循环
      const onMotionChange = () => {
        paused = reduceMotion || motionOff();
        if (paused) {
          stopLoop();
          renderFrame(1, 0);
        } else {
          startLoop();
        }
      };
      window.addEventListener("xieyi-motion-change", onMotionChange);
      cleanupFns.push(() => window.removeEventListener("xieyi-motion-change", onMotionChange));

      const onResize = () => {
        const s = getSize();
        w = s.w;
        h = s.h;
        renderer!.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(parent);
      cleanupFns.push(() => ro.disconnect());

      cleanupFns.push(() => {
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
            obj.geometry?.dispose();
            const m = obj.material;
            if (Array.isArray(m)) m.forEach((x) => x.dispose());
            else m?.dispose();
          }
        });
        petalTex.dispose();
        glowTex.dispose();
        renderer!.dispose();
      });
    })();

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      cleanupFns.forEach((fn) => fn());
      renderer = null;
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
