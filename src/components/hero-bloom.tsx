"use client";

import { useEffect, useRef } from "react";

/**
 * Hero 背景：three.js「昙花一现」绽放（参考图风格）。
 * - 花瓣为 canvas 绘制的半透明冰蓝贴片，带银白发光边缘；按 4 层径向排布。
 * - bloom 参数驱动 花苞→盛开→凋谢→花苞 循环，契合「昙花一现」。
 * - 加淡蓝烟雾粒子托底，与发光花瓣呼应。
 * 性能与可访问性：
 * - 动态 import('three')，不进 SSR；DPR≤2；离屏/隐藏暂停 RAF。
 * - prefers-reduced-motion 或 html[data-motion="off"] 时仅渲染单帧盛开静态画面。
 * - 跟随明/暗主题切换混合模式：暗色加色辉光、明色正常混合。
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
    const OPEN = 5;
    const HOLD1 = 8;
    const CLOSE = 6;
    const HOLD0 = 2.5;
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
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(52, w / h, 0.1, 300);
      camera.position.set(0, 0, 72);

      // 绘制单枚花瓣纹理：冰蓝半透明体 + 银白发光边缘
      const drawPetal = (tint: "cool" | "warm" | "blue") => {
        const c = document.createElement("canvas");
        c.width = 160;
        c.height = 320;
        const ctx = c.getContext("2d")!;
        const w = c.width;
        const h = c.height;

        ctx.clearRect(0, 0, w, h);
        const shape = new Path2D();
        shape.moveTo(w * 0.5, h * 0.92);
        shape.bezierCurveTo(w * 0.95, h * 0.62, w * 0.92, h * 0.22, w * 0.5, h * 0.04);
        shape.bezierCurveTo(w * 0.08, h * 0.22, w * 0.05, h * 0.62, w * 0.5, h * 0.92);

        // 内部渐变
        const body = ctx.createRadialGradient(w * 0.5, h * 0.35, 4, w * 0.5, h * 0.45, h * 0.55);
        if (tint === "warm") {
          body.addColorStop(0, "rgba(255,250,245,0.82)");
          body.addColorStop(0.45, "rgba(255,238,232,0.42)");
          body.addColorStop(0.85, "rgba(255,225,230,0.12)");
        } else if (tint === "blue") {
          body.addColorStop(0, "rgba(235,248,255,0.82)");
          body.addColorStop(0.45, "rgba(210,235,255,0.42)");
          body.addColorStop(0.85, "rgba(195,220,255,0.12)");
        } else {
          body.addColorStop(0, "rgba(248,252,255,0.85)");
          body.addColorStop(0.45, "rgba(225,240,255,0.45)");
          body.addColorStop(0.85, "rgba(210,230,255,0.14)");
        }
        body.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = body;
        ctx.fill(shape);

        // 银白发光边缘（多层描边叠加出辉光）
        ctx.save();
        ctx.clip(shape);
        ctx.strokeStyle = "rgba(255,255,255,0.55)";
        ctx.lineWidth = 5;
        ctx.shadowColor = "rgba(200,235,255,0.85)";
        ctx.shadowBlur = 16;
        ctx.stroke(shape);
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 6;
        ctx.stroke(shape);
        ctx.restore();

        // 中间主脉
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        const vein = ctx.createLinearGradient(w * 0.5, h * 0.88, w * 0.5, h * 0.12);
        vein.addColorStop(0, "rgba(255,255,255,0)");
        vein.addColorStop(0.5, "rgba(255,255,255,0.22)");
        vein.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = vein;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(w * 0.5, h * 0.88);
        ctx.quadraticCurveTo(w * 0.52, h * 0.5, w * 0.5, h * 0.12);
        ctx.stroke();
        ctx.restore();

        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
      };

      const textures = [drawPetal("cool"), drawPetal("blue"), drawPetal("warm")];

      // 光晕纹理
      const glowTex = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 256;
        const ctx = c.getContext("2d")!;
        const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        g.addColorStop(0, "rgba(220,245,255,0.55)");
        g.addColorStop(0.35, "rgba(180,220,255,0.22)");
        g.addColorStop(0.75, "rgba(160,210,255,0.06)");
        g.addColorStop(1, "rgba(160,210,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 256, 256);
        return new THREE.CanvasTexture(c);
      })();

      // 烟雾纹理
      const smokeTex = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 128;
        const ctx = c.getContext("2d")!;
        const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        g.addColorStop(0, "rgba(210,235,255,0.28)");
        g.addColorStop(0.5, "rgba(200,230,255,0.10)");
        g.addColorStop(1, "rgba(200,230,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(c);
      })();

      const flower = new THREE.Group();
      // 放在右侧、放大到视觉焦点级别
      flower.position.set(46, 2, 0);
      flower.scale.setScalar(2.3);
      scene.add(flower);

      const petalMat = new THREE.MeshBasicMaterial({
        map: textures[0],
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        opacity: 1,
      });

      type Petal = {
        tilt: import("three").Group;
        closedX: number;
        openX: number;
        openScale: number;
        sway: number;
        phase: number;
      };
      const petals: Petal[] = [];

      // 花苞状态：所有花瓣指向相机（+Z），即绕局部 X 旋转 -π/2
      const CLOSED = -Math.PI / 2;
      const addLayer = (
        count: number,
        w: number,
        h: number,
        openTilt: number,
        openScale: number,
        offset: number,
        texIdx: number,
      ) => {
        const geo = new THREE.PlaneGeometry(w, h);
        // 让贴图基部位于几何体原点，沿 +Y 生长
        geo.translate(0, h * 0.5, 0);
        const mat = petalMat.clone();
        mat.map = textures[texIdx % textures.length];
        mat.needsUpdate = true;

        for (let i = 0; i < count; i++) {
          const pivot = new THREE.Group();
          pivot.rotation.z = (i / count) * Math.PI * 2 + offset;
          const tilt = new THREE.Group();
          tilt.rotation.x = CLOSED;
          const mesh = new THREE.Mesh(geo, mat);
          tilt.add(mesh);
          pivot.add(tilt);
          flower.add(pivot);
          petals.push({
            tilt,
            closedX: CLOSED,
            openX: openTilt,
            openScale,
            sway: 0.03 + Math.random() * 0.04,
            phase: Math.random() * Math.PI * 2,
          });
        }
      };
      addLayer(13, 7.5, 18.5, -0.06, 1.0, 0, 0);
      addLayer(11, 6.6, 15.5, -0.18, 0.95, Math.PI / 11, 1);
      addLayer(9, 5.4, 12.0, -0.34, 0.88, Math.PI / 9, 2);
      addLayer(7, 4.2, 8.5, -0.55, 0.78, Math.PI / 7, 0);

      // 花蕊：细丝 + 发光尖端
      const stamens = new THREE.Group();
      const stamenMat = new THREE.MeshBasicMaterial({
        color: 0xfff8f0,
        transparent: true,
        opacity: 0.9,
      });
      const tipMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xffe8c8,
        opacity: 0.85,
      });
      const STN = 18;
      for (let i = 0; i < STN; i++) {
        const g = new THREE.Group();
        g.rotation.z = (i / STN) * Math.PI * 2 + Math.random() * 0.3;
        g.rotation.x = -0.16;
        const len = 6.5 + Math.random() * 2.2;
        const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.09, len, 6), stamenMat);
        cyl.position.y = len / 2;
        g.add(cyl);
        const tip = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4), tipMat);
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
        opacity: 0.55,
      });
      const halo = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), haloMat);
      halo.position.z = -3;
      flower.add(halo);

      // 烟雾粒子
      const SMOKE = 120;
      const sPos = new Float32Array(SMOKE * 3);
      const sBaseX = new Float32Array(SMOKE);
      const sBaseY = new Float32Array(SMOKE);
      const sSpeed = new Float32Array(SMOKE);
      const sPhase = new Float32Array(SMOKE);
      const sScale = new Float32Array(SMOKE);
      for (let i = 0; i < SMOKE; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = 8 + Math.random() * 34;
        const x = Math.cos(a) * r + 46;
        const y = Math.sin(a) * r * 0.7 + 2;
        const z = (Math.random() - 0.5) * 16;
        sPos[3 * i] = x;
        sPos[3 * i + 1] = y;
        sPos[3 * i + 2] = z;
        sBaseX[i] = x;
        sBaseY[i] = y;
        sSpeed[i] = 0.4 + Math.random() * 1.2;
        sPhase[i] = Math.random() * Math.PI * 2;
        sScale[i] = 6 + Math.random() * 14;
      }
      const sGeo = new THREE.BufferGeometry();
      sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
      const sMat = new THREE.PointsMaterial({
        size: 1,
        map: smokeTex,
        color: 0xc8e6ff,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        opacity: 0.28,
      });
      const smoke = new THREE.Points(sGeo, sMat);
      scene.add(smoke);
      const sPosAttr = sGeo.attributes.position as import("three").BufferAttribute;

      const applyTheme = () => {
        const dark = document.documentElement.classList.contains("dark");
        petalMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        petalMat.opacity = dark ? 0.95 : 0.82;
        petalMat.needsUpdate = true;
        tipMat.blending = THREE.AdditiveBlending;
        tipMat.needsUpdate = true;
        haloMat.blending = THREE.AdditiveBlending;
        haloMat.needsUpdate = true;
        sMat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        sMat.opacity = dark ? 0.28 : 0.18;
        sMat.needsUpdate = true;
      };
      applyTheme();
      const themeObs = new MutationObserver(applyTheme);
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      cleanupFns.push(() => themeObs.disconnect());

      const update = (bloom: number, t: number) => {
        for (const p of petals) {
          const tiltX =
            lerp(p.closedX, p.openX, bloom) +
            Math.sin(t * 0.5 + p.phase) * p.sway * (0.3 + bloom);
          p.tilt.rotation.x = tiltX;
          p.tilt.scale.setScalar(lerp(0.28, p.openScale, bloom));
        }
        stamens.scale.setScalar(lerp(0.18, 1, bloom));
        stamens.rotation.y = t * 0.25;
        haloMat.opacity = 0.25 + bloom * 0.55;
        halo.scale.setScalar(lerp(22, 44, bloom));
        flower.rotation.z = Math.sin(t * 0.04) * 0.1 + t * 0.006;
        flower.position.y = 2 + Math.sin(t * 0.42) * 0.8;

        for (let i = 0; i < SMOKE; i++) {
          const y = sBaseY[i] + Math.sin(t * 0.15 + sPhase[i]) * 1.2 + ((t * sSpeed[i]) % 24) - 12;
          const x = sBaseX[i] + Math.cos(t * 0.2 + sPhase[i]) * 1.8;
          // 盛开时烟雾更淡，花苞时略浓
          const breath = 0.7 + bloom * 0.3;
          sPosAttr.setY(i, y * breath);
          sPosAttr.setX(i, x);
        }
        sPosAttr.needsUpdate = true;
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
        renderFrame(1, 0);
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
        textures.forEach((t) => t.dispose());
        glowTex.dispose();
        smokeTex.dispose();
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
