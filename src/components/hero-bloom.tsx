"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero 背景：几滴墨在纸上「润开」的 WebGL 动画。
 *
 * 思路（参考「墨在纸上晕染」的轻量风格化方案）：
 * - 全屏片元着色器，用「域扭曲 fbm 噪声」扰动每个墨团的半径，得到不规则、带纤维感的墨边。
 * - 每滴墨错峰落下：落上去是小而深的墨点，再慢慢洇开变大、同时变淡消失，
 *   一个接一个，不会同时出现/消失。
 * - 浅色主题近黑浓墨，深色主题淡银墨；画布透明，纸纹由页面背景透出。
 * - 减少动效 / data-motion="off" 时渲染一帧静态满墨；视口外 / 标签页隐藏时暂停。
 */

// 墨滴数量（位置/种子运行时随机，避免固定点位反复出现）
const COUNT = 3;
// 生命周期（秒），参考「墨在纸上缓缓渗开」的实现
const EXPAND = 24.0; // 完全洇开的总时长（缓缓）
const FADE_B = 9.0; // 开始变淡的时间点
const TOTAL = 30.0; // 完全消失的时刻
const R_MIN = 0.02; // 刚落下时的小墨点半径
const R_MAX = 0.22; // 渗化后的最大半径
const LOOP = 35.0; // 整段循环长度（驱动错峰重复）

const VS = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main(){
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 frag;

uniform float uTime;
uniform float uAspect;
uniform float uStatic;
uniform vec3 uInk;
uniform float uMaxAlpha;
uniform vec2 uPos[${COUNT}];
uniform float uStart[${COUNT}];
uniform float uSeed[${COUNT}];

const float EXPAND = ${EXPAND.toFixed(1)};
const float FADE_B = ${FADE_B.toFixed(1)};
const float TOTAL  = ${TOTAL.toFixed(1)};
const float R_MIN  = ${R_MIN.toFixed(3)};
const float R_MAX  = ${R_MAX.toFixed(3)};
const float LOOP   = ${LOOP.toFixed(1)};

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++){ v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main(){
  vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
  float alpha = 0.0;

  for (int i = 0; i < ${COUNT}; i++){
    float t = mod(uTime - uStart[i], LOOP);
    if (uStatic > 0.5) t = 22.0; // 静态：取一个墨滴各异的阶段
    if (t > 0.0 && t < TOTAL){
      vec2  c    = (uPos[i] - 0.5) * vec2(uAspect, 1.0);
      float seed = uSeed[i];
      float d    = length(p - c);
      float tt   = clamp(t / EXPAND, 0.0, 1.0);

      // 平滑曲线：整体缓缓晕开
      float ease = tt * tt * (3.0 - 2.0 * tt);
      float r = mix(R_MIN, R_MAX, ease);

      // 基础频率高：落地瞬间墨点即呈不规则轮廓；频率随洇开增大（3 八度 fbm）
      float n1  = fbm(p * (14.0 + 20.0 * ease) + seed * 17.0 + vec2(0.0, t * 0.02));
      // 低频渗化路径（3 八度 fbm）
      float n2  = fbm(p * (1.8 + 8.0 * ease) - seed * 9.0 - vec2(t * 0.02, t * 0.015));
      // 高频细节层（单八度噪声，足够细腻且更省）
      float n1b = noise(p * 40.0 - seed * 31.0 + vec2(t * 0.05, 0.0));
      // 纸纤维颗粒感（单八度噪声）
      float grain = 0.68 + 0.42 * noise(p * 13.0 + seed * 31.0 + t * 0.05);

      // 不规则边缘：振幅大，波动范围约 0.30~1.40 倍半径
      float edge = r * (0.30 + 1.10 * n1 * (0.55 + 0.45 * n1b));
      // 过渡层：落地时窄、边缘硬朗，随渗开逐渐变宽
      float wet  = r * (0.05 + 0.35 * ease + 0.30 * (1.0 - n2));

      float body = 1.0 - smoothstep(edge - wet, edge + wet * 2.0, d);

      // 外围宽渐变晕层
      float halo = 1.0 - smoothstep(edge, edge * 3.0, d);

      // 浓度随面积增大自然变淡（落点深、洇开后淡）
      float spread   = R_MIN / r;
      float strength = clamp(pow(spread, 1.7) * 3.0, 0.0, 1.0);

      // 最后阶段淡出
      float fade = 1.0 - smoothstep(FADE_B, TOTAL, t);

      alpha += (body * grain + halo * 0.32) * strength * fade;
    }
  }

  alpha = clamp(alpha, 0.0, 1.0);
  frag = vec4(uInk, alpha * uMaxAlpha);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("shader compile error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function HeroBloom({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VS);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("program link error:", gl.getProgramInfoLog(prog));
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    // 全屏三角形
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // uniform 句柄
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uAspect = gl.getUniformLocation(prog, "uAspect");
    const uStatic = gl.getUniformLocation(prog, "uStatic");
    const uInk = gl.getUniformLocation(prog, "uInk");
    const uMaxAlpha = gl.getUniformLocation(prog, "uMaxAlpha");
    const uPos = gl.getUniformLocation(prog, `uPos[0]`);
    const uStart = gl.getUniformLocation(prog, `uStart[0]`);
    const uSeed = gl.getUniformLocation(prog, `uSeed[0]`);

    // 运行时随机：每滴的位置/种子在每次重新出现时都会重抽，避免固定点位反复出现
    const posArr = new Float32Array(COUNT * 2);
    const seedArr = new Float32Array(COUNT);
    const startArr = new Float32Array(COUNT);
    const prevCycle = new Int32Array(COUNT);
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const randomizeDrop = (i: number) => {
      posArr[i * 2] = rand(0.2, 0.8);
      posArr[i * 2 + 1] = rand(0.28, 0.72);
      seedArr[i] = rand(0, 100);
    };
    for (let i = 0; i < COUNT; i++) {
      startArr[i] = (i * LOOP) / COUNT; // 错峰起始，三滴不撞在一起落下
      randomizeDrop(i);
      prevCycle[i] = Math.floor((0 - startArr[i]) / LOOP);
    }
    gl.uniform2fv(uPos, posArr);
    gl.uniform1fv(uStart, startArr);
    gl.uniform1fv(uSeed, seedArr);

    // 内部渲染分辨率上限，避免全屏高 DPR 下像素爆炸（墨晕是柔和效果，低分辨率几乎无差）
    const MAX_DIM = 700;
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      const k = Math.min(1, MAX_DIM / Math.max(w, h));
      const bw = Math.max(1, Math.floor(w * k));
      const bh = Math.max(1, Math.floor(h * k));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uAspect, canvas.width / canvas.height);
    };

    const isReduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.getAttribute("data-motion") === "off";

    const applyTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      // 浅色近黑浓墨；深色淡银墨
      gl.uniform3f(uInk, dark ? 0.78 : 0.05, dark ? 0.83 : 0.06, dark ? 0.92 : 0.09);
      gl.uniform1f(uMaxAlpha, dark ? 0.55 : 0.8);
    };

    resize();
    applyTheme();

    const themeObs = new MutationObserver(applyTheme);
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let raf = 0;
    let paused = true;
    let lastDraw = 0;
    const FRAME_MS = 33; // 限到 ~30fps：墨晕是缓慢渗开，30fps 与 60fps 观感一致，省一半 GPU
    const start = performance.now();

    const renderStatic = () => {
      gl.uniform1f(uStatic, 1);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const renderFrame = (tMs: number) => {
      const uTimeVal = (tMs - start) / 1000;
      // 每滴周期（LOOP 秒）结束、重新出现时重抽位置与种子，避免固定点位反复出现
      let dirty = false;
      for (let i = 0; i < COUNT; i++) {
        const cyc = Math.floor((uTimeVal - startArr[i]) / LOOP);
        if (cyc !== prevCycle[i]) {
          prevCycle[i] = cyc;
          randomizeDrop(i);
          dirty = true;
        }
      }
      if (dirty) {
        gl.uniform2fv(uPos, posArr);
        gl.uniform1fv(uSeed, seedArr);
      }
      gl.uniform1f(uStatic, 0);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, uTimeVal);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (paused) return;
      if (now - lastDraw >= FRAME_MS) {
        lastDraw = now;
        renderFrame(now);
      }
      raf = requestAnimationFrame(loop);
    };

    const play = () => {
      if (paused) {
        paused = false;
        lastDraw = 0;
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      paused = true;
      cancelAnimationFrame(raf);
    };

    // 响应总动效开关（header 的开关按钮改 data-motion）：关闭即停渲染并只画一帧静态墨晕
    const reconfigure = () => {
      if (isReduced()) {
        stop();
        renderStatic();
      } else {
        play();
      }
    };

    if (isReduced()) {
      renderStatic();
    } else {
      play();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? (!isReduced() && play()) : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stop();
      else if (!isReduced()) play();
    };
    document.addEventListener("visibilitychange", onVis);

    // 监听 data-motion 属性变化（用户点击开关按钮）
    const motionObs = new MutationObserver(reconfigure);
    motionObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      themeObs.disconnect();
      motionObs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  if (failed) {
    // WebGL2 不可用时的兜底：静态 CSS 墨晕
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(40% 40% at 68% 40%, rgba(10,12,16,0.55), transparent 70%), radial-gradient(30% 30% at 50% 66%, rgba(10,12,16,0.45), transparent 70%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}
