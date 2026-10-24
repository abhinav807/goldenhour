"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { FRAGMENT, VERTEX } from "./holoShaders";
import styles from "./HoloCard.module.css";

// Adapted from React Bits HoloCard: HTML stays selectable and links stay native.
export default function HoloCard({ children, className = "", preset = "bursts" }: {
  children: ReactNode;
  className?: string;
  preset?: "bursts" | "shards" | "gold";
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rotorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const rotor = rotorRef.current;
    const canvas = canvasRef.current;
    if (!root || !rotor || !canvas) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: false });
    const program = gl?.createProgram();
    const shaders: WebGLShader[] = [];
    let buffer: WebGLBuffer | null = null;
    let texture: WebGLTexture | null = null;
    let ready = false;
    if (gl && program) {
      for (const [type, source] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]] as const) {
        const shader = gl.createShader(type);
        if (!shader) continue;
        shaders.push(shader);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) gl.attachShader(program, shader);
      }
      gl.bindAttribLocation(program, 0, "position");
      gl.linkProgram(program);
      ready = !!gl.getProgramParameter(program, gl.LINK_STATUS);
      if (ready) {
        gl.useProgram(program);
        buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
      }
    }
    const uniforms = new Map<string, WebGLUniformLocation | null>();
    const uniform = (name: string) => {
      if (!uniforms.has(name)) uniforms.set(name, gl && program ? gl.getUniformLocation(program, name) : null);
      return uniforms.get(name) ?? null;
    };
    let x = 0.36, y = 0.26, hovering = false, visible = false, raf = 0;
    let tiltX = 0, tiltY = 0, lastFrame = 0;
    const draw = () => {
      if (!gl || !program || !ready || gl.isContextLost()) return;
      gl.useProgram(program);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniform("uSize"), canvas.width, canvas.height);
      gl.uniform1f(uniform("uAspect"), canvas.height / canvas.width);
      gl.uniform2f(uniform("uTilt"), tiltX * Math.PI / 180, tiltY * Math.PI / 180);
      gl.uniform2f(uniform("uLight"), x, y);
      gl.uniform1f(uniform("uDistance"), 1100 / Math.max(1, root.clientWidth));
      gl.uniform1i(uniform("uPreset"), preset === "gold" ? 7 : preset === "shards" ? 2 : 0);
      gl.uniform1f(uniform("uIntensity"), 0.85);
      gl.uniform1f(uniform("uScale"), 1);
      gl.uniform1f(uniform("uEdge"), 0.8);
      gl.uniform1f(uniform("uFrame"), 0.025);
      gl.uniform1f(uniform("uRadius"), 14 / Math.max(1, root.clientWidth));
      gl.uniform1f(uniform("uGlare"), 0.5);
      gl.uniform3f(uniform("uFoil"), 0.78, 0.8, 0.84);
      gl.uniform1f(uniform("uReady"), 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const tick = (time: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      // Idle foil needs fewer frames than direct pointer interaction.
      if (!motion.matches && !hovering && time - lastFrame < 1000 / 30) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastFrame = time;
      if (!hovering) {
        x = 0.5 + Math.sin(time * 0.00041) * 0.35;
        y = 0.38 + Math.sin(time * 0.00033) * 0.25;
      }
      const targetX = motion.matches ? 0 : (0.5 - y) * (hovering ? 16 : 5);
      const targetY = motion.matches ? 0 : (x - 0.5) * (hovering ? 16 : 5);
      tiltX += (targetX - tiltX) * 0.12;
      tiltY += (targetY - tiltY) * 0.12;
      rotor.style.transform = motion.matches ? "none" : `perspective(1100px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${hovering ? 1.025 : 1})`;
      draw();
      if (!motion.matches) raf = requestAnimationFrame(tick);
    };
    const wake = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick); };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(root.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(root.clientHeight * dpr));
      draw();
      wake();
    };
    const track = (event: PointerEvent) => {
      if (event.pointerType === "touch" || motion.matches) return;
      const rect = root.getBoundingClientRect();
      x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      hovering = true;
      wake();
    };
    const leave = () => { hovering = false; wake(); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };
    const visibility = () => { if (document.hidden) stop(); else wake(); };
    const preference = () => { stop(); tiltX = tiltY = 0; rotor.style.transform = "none"; wake(); };
    const lost = () => { ready = false; canvas.style.opacity = "0"; };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake(); else stop();
    });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(root);
    sizeObserver.observe(root);
    root.addEventListener("pointermove", track);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("pointercancel", leave);
    canvas.addEventListener("webglcontextlost", lost);
    motion.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    resize();
    return () => {
      stop();
      observer.disconnect();
      sizeObserver.disconnect();
      root.removeEventListener("pointermove", track);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("pointercancel", leave);
      canvas.removeEventListener("webglcontextlost", lost);
      motion.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
      if (gl) {
        shaders.forEach(shader => gl.deleteShader(shader));
        gl.deleteBuffer(buffer);
        gl.deleteTexture(texture);
        if (program) gl.deleteProgram(program);
      }
    };
  }, [preset]);

  return <div ref={rootRef} className={`${styles.card} ${className}`}>
    <div ref={rotorRef} className={styles.rotor}>
      <div className={styles.content}>{children}</div>
      <canvas ref={canvasRef} className={styles.foil} aria-hidden="true" />
    </div>
  </div>;
}
