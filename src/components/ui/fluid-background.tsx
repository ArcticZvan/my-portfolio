"use client";

import { useEffect, useRef } from "react";

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let animationId: number;
    let time = 0;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.3, y: 0.25, r: 350, color: "rgba(139, 92, 246, 0.25)", speed: 0.3, phase: 0 },
      { x: 0.7, y: 0.55, r: 400, color: "rgba(99, 102, 241, 0.18)", speed: 0.25, phase: 2 },
      { x: 0.5, y: 0.8, r: 300, color: "rgba(192, 132, 252, 0.2)", speed: 0.35, phase: 4 },
      { x: 0.15, y: 0.65, r: 320, color: "rgba(129, 140, 248, 0.15)", speed: 0.2, phase: 1 },
      { x: 0.85, y: 0.2, r: 380, color: "rgba(167, 139, 250, 0.17)", speed: 0.28, phase: 3 },
    ];

    function drawSun(w: number, h: number, t: number) {
      const cx = 0;
      const cy = 0;
      const breath = 0.8 + Math.sin(t * 1.2) * 0.12 + Math.sin(t * 2.7) * 0.06;

      // Outermost haze
      const g4 = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 500 * breath);
      g4.addColorStop(0, `rgba(244, 144, 240, ${0.08 * breath})`);
      g4.addColorStop(0.4, `rgba(192, 132, 252, ${0.04 * breath})`);
      g4.addColorStop(1, "transparent");
      ctx!.fillStyle = g4;
      ctx!.fillRect(0, 0, 500, 500);

      // Wide glow
      const g3 = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 320 * breath);
      g3.addColorStop(0, `rgba(251, 191, 236, ${0.2 * breath})`);
      g3.addColorStop(0.5, `rgba(232, 121, 249, ${0.1 * breath})`);
      g3.addColorStop(1, "transparent");
      ctx!.fillStyle = g3;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 320 * breath, 0, Math.PI * 2);
      ctx!.fill();

      // Mid glow
      const g2 = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 180 * breath);
      g2.addColorStop(0, `rgba(253, 224, 246, ${0.5 * breath})`);
      g2.addColorStop(0.4, `rgba(249, 168, 212, ${0.25 * breath})`);
      g2.addColorStop(1, "transparent");
      ctx!.fillStyle = g2;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 180 * breath, 0, Math.PI * 2);
      ctx!.fill();

      // Hot core
      const g1 = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 80 * breath);
      g1.addColorStop(0, `rgba(255, 245, 253, ${0.9 * breath})`);
      g1.addColorStop(0.3, `rgba(255, 210, 240, ${0.6 * breath})`);
      g1.addColorStop(0.7, `rgba(249, 168, 212, ${0.3 * breath})`);
      g1.addColorStop(1, "transparent");
      ctx!.fillStyle = g1;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 80 * breath, 0, Math.PI * 2);
      ctx!.fill();
    }

    function drawBlob(blob: typeof blobs[0], w: number, h: number, t: number) {
      const bt = t * blob.speed + blob.phase;
      const cx = w * blob.x + Math.sin(bt * 0.7) * w * 0.12 + Math.cos(bt * 0.3) * w * 0.05;
      const cy = h * blob.y + Math.cos(bt * 0.5) * h * 0.1 + Math.sin(bt * 0.8) * h * 0.04;
      const rx = blob.r + Math.sin(bt * 1.1) * 60 + Math.cos(bt * 0.6) * 30;
      const ry = blob.r + Math.cos(bt * 0.9) * 50 + Math.sin(bt * 1.3) * 40;

      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(bt * 0.4);

      const gradient = ctx!.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry));
      gradient.addColorStop(0, blob.color);
      gradient.addColorStop(1, "transparent");
      ctx!.fillStyle = gradient;
      ctx!.beginPath();

      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const distort = 1
          + Math.sin(angle * 3 + bt * 1.5) * 0.15
          + Math.cos(angle * 2 + bt * 0.8) * 0.1
          + Math.sin(angle * 5 + bt * 2.1) * 0.05;
        const px = Math.cos(angle) * rx * distort;
        const py = Math.sin(angle) * ry * distort;
        if (i === 0) {
          ctx!.moveTo(px, py);
        } else {
          ctx!.lineTo(px, py);
        }
      }

      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      for (const blob of blobs) {
        drawBlob(blob, w, h, time);
      }

      drawSun(w, h, time);

      time += 0.008;
      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
