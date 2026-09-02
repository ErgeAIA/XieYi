"use client";

import { useEffect, useRef } from "react";

/**
 * Hero 背景：three.js 火山余烬粒子场。
 * 性能与可访问性：
 * - 动态 import('three')，不进入 SSR、不阻塞首屏 JS。
 * - DPR 上限 2；粒子数受控（约 400）。
 * - 离屏（IntersectionObserver）或标签页隐藏时暂停 RAF。
 * - prefers-reduced-motion：只渲染单帧静态画面。
 * - 跟随明/暗主题切换混合模式与不透明度（暗色加色辉光、明色正常混合）。
 */
export function HeroEmber({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let renderer: import("three").WebGLRenderer | null = null;
    let frame = 0;
    const cleanupFns: Array<() => void> = [];

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
      const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 200);
      camera.position.set(0, 0, 60);

      const sprite = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 64;
        const ctx = c.getContext("2d")!;
        const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, "rgba(255,240,210,1)");
        g.addColorStop(0.25, "rgba(255,170,90,0.85)");
        g.addColorStop(1, "rgba(255,110,40,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(c);
      })();

      const COUNT = 400;
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);
      const speeds = new Float32Array(COUNT);
      const phases = new Float32Array(COUNT);
      const sways = new Float32Array(COUNT);
      const baseX = new Float32Array(COUNT);

      const top = 34;
      const bottom = -34;
      const spanX = 54;
      const spanZ = 26;

      const cWarm = new THREE.Color("#ff8a3d");
      const cDeep = new THREE.Color("#ff5a1f");
      const cPale = new THREE.Color("#ffd9a0");

      for (let i = 0; i < COUNT; i++) {
        const x = (Math.random() * 2 - 1) * spanX;
        const y = Math.random() * (top - bottom) + bottom;
        const z = (Math.random() * 2 - 1) * spanZ;
        positions[3 * i] = x;
        positions[3 * i + 1] = y;
        positions[3 * i + 2] = z;
        baseX[i] = x;
        speeds[i] = 2 + Math.random() * 5;
        phases[i] = Math.random() * Math.PI * 2;
        sways[i] = 1 + Math.random() * 3;
        const m = Math.random();
        const col =
          m < 0.5
            ? cDeep.clone().lerp(cWarm, m * 2)
            : cWarm.clone().lerp(cPale, (m - 0.5) * 2);
        colors[3 * i] = col.r;
        colors[3 * i + 1] = col.g;
        colors[3 * i + 2] = col.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 2.6,
        map: sprite,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geo, material);
      scene.add(points);

      const applyTheme = () => {
        const dark = document.documentElement.classList.contains("dark");
        material.opacity = dark ? 0.95 : 0.5;
        material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        material.needsUpdate = true;
      };
      applyTheme();
      const themeObs = new MutationObserver(applyTheme);
      themeObs.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      cleanupFns.push(() => themeObs.disconnect());

      const pos = geo.attributes.position as import("three").BufferAttribute;
      const startTime = performance.now();
      let lastTime = startTime;

      const render = () => {
        const now = performance.now();
        const delta = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;
        const t = (now - startTime) / 1000;
        for (let i = 0; i < COUNT; i++) {
          let y = pos.getY(i) + speeds[i] * delta;
          if (y > top) {
            y = bottom;
            baseX[i] = (Math.random() * 2 - 1) * spanX;
          }
          pos.setY(i, y);
          pos.setX(i, baseX[i] + Math.sin(t * 0.4 + phases[i]) * sways[i]);
        }
        pos.needsUpdate = true;
        points.rotation.y = Math.sin(t * 0.05) * 0.15;
        renderer!.render(scene, camera);
      };

      const loop = () => {
        frame = requestAnimationFrame(loop);
        render();
      };

      if (reduceMotion) {
        render();
      } else {
        frame = requestAnimationFrame(loop);
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          if (reduceMotion) return;
          if (entry.isIntersecting && !document.hidden) {
            if (!frame) frame = requestAnimationFrame(loop);
          } else if (frame) {
            cancelAnimationFrame(frame);
            frame = 0;
          }
        },
        { threshold: 0 }
      );
      io.observe(canvas);
      cleanupFns.push(() => io.disconnect());

      const onVis = () => {
        if (reduceMotion) return;
        if (document.hidden) {
          if (frame) {
            cancelAnimationFrame(frame);
            frame = 0;
          }
        } else if (!frame) {
          frame = requestAnimationFrame(loop);
        }
      };
      document.addEventListener("visibilitychange", onVis);
      cleanupFns.push(() => document.removeEventListener("visibilitychange", onVis));

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
        geo.dispose();
        material.dispose();
        sprite.dispose();
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
