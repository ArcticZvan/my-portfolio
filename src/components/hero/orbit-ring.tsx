"use client";

import { useEffect, useRef } from "react";

export function OrbitRing({ ready }: { ready: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(false);
  const introStartRef = useRef(-1);

  useEffect(() => {
    if (ready) {
      readyRef.current = true;
    }
  }, [ready]);

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
      const parent = canvas!.parentElement;
      if (parent) {
        canvas!.width = parent.clientWidth;
        canvas!.height = parent.clientHeight;
      }
    }

    resize();
    window.addEventListener("resize", resize);

    function easeOutExpo(x: number): number {
      return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.clearRect(0, 0, w, h);

      if (!readyRef.current) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      if (introStartRef.current < 0) {
        introStartRef.current = time;
      }

      const introElapsed = time - introStartRef.current;
      const introDuration = 2.5;
      const introProgress = easeOutExpo(Math.min(introElapsed / introDuration, 1));

      // Intro: scale from tiny to full
      const scale = 0.03 + introProgress * 0.97;
      // Intro: tilt flips from nearly edge-on to resting angle
      const tiltStart = -1.4;
      const tiltEnd = -0.18;
      const tilt = tiltStart + (tiltEnd - tiltStart) * introProgress;
      // Intro: ry ratio changes to simulate 3D flip
      const ryRatioStart = 0.6;
      const ryRatioEnd = 0.25;
      const ryRatio = ryRatioStart + (ryRatioEnd - ryRatioStart) * introProgress;

      const cx = w / 2;
      const cy = h / 2;
      const baseRx = Math.min(w * 0.60, 800);
      const rx = baseRx * scale;
      const ry = rx * ryRatio;
      const rotation = time * 0.1;

      const globalAlpha = Math.min(introProgress * 2, 1);
      ctx!.globalAlpha = globalAlpha;

      ctx!.save();
      ctx!.translate(cx, cy);
      ctx!.rotate(tilt);

      // Outer glow ring
      ctx!.beginPath();
      ctx!.ellipse(0, 0, rx + 3, ry + 2, 0, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(167, 139, 250, 0.06)";
      ctx!.lineWidth = 12;
      ctx!.stroke();

      // Metallic ring segments
      const ringSegments = 360;
      for (let i = 0; i < ringSegments; i++) {
        const angle = (i / ringSegments) * Math.PI * 2 + rotation;
        const nextAngle = ((i + 1) / ringSegments) * Math.PI * 2 + rotation;

        const x1 = Math.cos(angle) * rx;
        const y1 = Math.sin(angle) * ry;
        const x2 = Math.cos(nextAngle) * rx;
        const y2 = Math.sin(nextAngle) * ry;

        const lightAngle = angle + time * 0.3;
        const specular = Math.pow(Math.max(0, Math.cos(lightAngle * 2)), 3);
        const depth = (Math.sin(angle) + 1) / 2;

        const baseR = 160 + specular * 80;
        const baseG = 150 + specular * 90;
        const baseB = 180 + specular * 75;
        const alpha = 0.15 + depth * 0.35 + specular * 0.3;

        ctx!.beginPath();
        ctx!.moveTo(x1, y1);
        ctx!.lineTo(x2, y2);
        ctx!.strokeStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${alpha})`;
        ctx!.lineWidth = 2.5 + specular * 1.5;
        ctx!.stroke();
      }

      // Specular highlight band
      ctx!.beginPath();
      ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      const specGrad = ctx!.createLinearGradient(-rx, 0, rx, 0);
      specGrad.addColorStop(0, "rgba(255, 255, 255, 0.0)");
      specGrad.addColorStop(0.35 + Math.sin(time * 0.4) * 0.1, "rgba(220, 210, 240, 0.0)");
      specGrad.addColorStop(0.5 + Math.sin(time * 0.4) * 0.1, "rgba(255, 255, 255, 0.12)");
      specGrad.addColorStop(0.65 + Math.sin(time * 0.4) * 0.1, "rgba(220, 210, 240, 0.0)");
      specGrad.addColorStop(1, "rgba(255, 255, 255, 0.0)");
      ctx!.strokeStyle = specGrad;
      ctx!.lineWidth = 4;
      ctx!.stroke();

      // Particles
      const particles = 120;
      for (let i = 0; i < particles; i++) {
        const angle = (i / particles) * Math.PI * 2 + rotation * 1.3;
        const px = Math.cos(angle) * rx;
        const py = Math.sin(angle) * ry;

        const wobble = Math.sin(angle * 4 + time * 0.6) * 5;
        const depth2 = (Math.sin(angle) + 1) / 2;
        const shimmer = Math.pow(Math.max(0, Math.cos(angle * 3 + time)), 4);
        const alpha2 = 0.05 + depth2 * 0.15 + shimmer * 0.4;
        const size = 0.8 + depth2 * 1.2 + shimmer * 2;

        ctx!.beginPath();
        ctx!.arc(px, py + wobble, size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(220, 215, 240, ${alpha2})`;
        ctx!.fill();
      }

      ctx!.restore();
      ctx!.globalAlpha = 1;

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
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
