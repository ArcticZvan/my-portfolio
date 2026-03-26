"use client";

import { useEffect, useRef, useCallback } from "react";

type Blob = {
  x: number; y: number; r: number;
  color: string; speed: number; phase: number;
};

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) { return; }
    const ctx = canvas.getContext("2d");
    if (!ctx) { return; }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const fontSize = Math.min(w * 0.1, 110);
    const font = `italic 400 ${fontSize}px "Playfair Display", "Georgia", serif`;

    // Same blobs as FluidBackground
    const blobs: Blob[] = [
      { x: 0.3, y: 0.25, r: 350, color: "rgba(139, 92, 246, 0.25)", speed: 0.3, phase: 0 },
      { x: 0.7, y: 0.55, r: 400, color: "rgba(99, 102, 241, 0.18)", speed: 0.25, phase: 2 },
      { x: 0.5, y: 0.8, r: 300, color: "rgba(192, 132, 252, 0.2)", speed: 0.35, phase: 4 },
      { x: 0.15, y: 0.65, r: 320, color: "rgba(129, 140, 248, 0.15)", speed: 0.2, phase: 1 },
      { x: 0.85, y: 0.2, r: 380, color: "rgba(167, 139, 250, 0.17)", speed: 0.28, phase: 3 },
    ];

    function drawFluid(t: number) {
      for (const b of blobs) {
        const bt = t * b.speed + b.phase;
        const bx = w * b.x + Math.sin(bt * 0.7) * w * 0.12 + Math.cos(bt * 0.3) * w * 0.05;
        const by = h * b.y + Math.cos(bt * 0.5) * h * 0.1 + Math.sin(bt * 0.8) * h * 0.04;
        const rx = b.r + Math.sin(bt * 1.1) * 60 + Math.cos(bt * 0.6) * 30;
        const ry = b.r + Math.cos(bt * 0.9) * 50 + Math.sin(bt * 1.3) * 40;

        ctx!.save();
        ctx!.translate(bx, by);
        ctx!.rotate(bt * 0.4);

        const g = ctx!.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry));
        g.addColorStop(0, b.color);
        g.addColorStop(1, "transparent");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        const segs = 48;
        for (let i = 0; i <= segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          const d = 1 + Math.sin(a * 3 + bt * 1.5) * 0.15 + Math.cos(a * 2 + bt * 0.8) * 0.1;
          const px = Math.cos(a) * rx * d;
          const py = Math.sin(a) * ry * d;
          i === 0 ? ctx!.moveTo(px, py) : ctx!.lineTo(px, py);
        }
        ctx!.closePath();
        ctx!.fill();
        ctx!.restore();
      }

      // Sun at top-left corner
      const breath = 0.8 + Math.sin(t * 1.2) * 0.12 + Math.sin(t * 2.7) * 0.06;
      const layers = [
        { r: 320, stops: [[0, `rgba(251,191,236,${0.2 * breath})`], [0.5, `rgba(232,121,249,${0.1 * breath})`], [1, "transparent"]] },
        { r: 180, stops: [[0, `rgba(253,224,246,${0.5 * breath})`], [0.4, `rgba(249,168,212,${0.25 * breath})`], [1, "transparent"]] },
        { r: 80, stops: [[0, `rgba(255,245,253,${0.9 * breath})`], [0.3, `rgba(255,210,240,${0.6 * breath})`], [1, "transparent"]] },
      ];
      for (const l of layers) {
        const g = ctx!.createRadialGradient(0, 0, 0, 0, 0, l.r * breath);
        for (const [o, c] of l.stops) { g.addColorStop(o as number, c as string); }
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(0, 0, l.r * breath, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    let time = 0;
    let phase = 0;
    let phaseTime = 0;
    let done = false;

    const DURATIONS = [1.4, 0.8, 0.5, 1.0];

    const arcticStartX = -w * 0.5;
    const arcticEndX = -20;
    const zvanStartX = w * 0.5;
    const zvanEndX = 20;
    let arcticX = arcticStartX;
    let zvanX = zvanStartX;
    let arcticAlpha = 0;
    let zvanAlpha = 0;
    const arcticTrail: Array<{ x: number; alpha: number }> = [];
    const zvanTrail: Array<{ x: number; alpha: number }> = [];

    function drawTextGlow(text: string, x: number, y: number, alpha: number, glitch: number) {
      ctx!.save();
      ctx!.font = font;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      const tx = cx + x;

      if (glitch > 0.01) {
        const slices = 5;
        const sh = fontSize / slices;
        for (let i = 0; i < slices; i++) {
          const gx = (Math.random() - 0.5) * 14 * glitch;
          if (Math.random() < glitch * 0.25) { continue; }
          ctx!.save();
          ctx!.beginPath();
          ctx!.rect(0, y - fontSize / 2 + i * sh, w, sh);
          ctx!.clip();
          const sp = glitch * 3;
          ctx!.globalAlpha = alpha * 0.3;
          ctx!.fillStyle = "rgba(255,80,80,0.5)";
          ctx!.fillText(text, tx + gx - sp, y);
          ctx!.fillStyle = "rgba(80,80,255,0.5)";
          ctx!.fillText(text, tx + gx + sp, y);
          ctx!.globalAlpha = alpha;
          ctx!.fillStyle = `rgba(225,215,250,${alpha})`;
          ctx!.fillText(text, tx + gx, y);
          ctx!.restore();
        }
      } else {
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = `rgba(225,215,250,${alpha})`;
        ctx!.fillText(text, tx, y);
      }

      if (alpha > 0.05) {
        ctx!.globalAlpha = alpha * 0.4;
        ctx!.shadowColor = "rgba(139,92,246,0.9)";
        ctx!.shadowBlur = 40;
        ctx!.fillStyle = `rgba(180,150,255,${alpha * 0.6})`;
        ctx!.fillText(text, tx, y);
        ctx!.shadowBlur = 0;
      }
      ctx!.restore();
    }

    function drawTrail(trail: Array<{ x: number; alpha: number }>, text: string, y: number) {
      ctx!.save();
      ctx!.font = font;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (const t of trail) {
        if (t.alpha < 0.01) { continue; }
        ctx!.globalAlpha = t.alpha * 0.15;
        ctx!.shadowColor = `rgba(139,92,246,${t.alpha * 0.5})`;
        ctx!.shadowBlur = 20;
        ctx!.fillStyle = `rgba(192,132,252,${t.alpha * 0.3})`;
        ctx!.fillText(text, cx + t.x, y);
        ctx!.shadowBlur = 0;
      }
      ctx!.restore();
    }

    function update() {
      if (done) { return; }

      time += 0.016;
      phaseTime += 0.016;

      if (phaseTime >= DURATIONS[phase] && phase < 3) {
        phase++;
        phaseTime = 0;
      }

      const p = Math.min(phaseTime / DURATIONS[phase], 1);

      // Opaque background
      ctx!.fillStyle = "#0a0a0f";
      ctx!.fillRect(0, 0, w, h);

      // Draw fluid blobs + sun on top
      drawFluid(time);

      const arcticY = cy - fontSize * 0.45;
      const zvanY = cy + fontSize * 0.45;

      // Phase 0: text shoots in from edges
      if (phase === 0) {
        const t1 = Math.min(p * 1.2, 1);
        const elastic = 1 - Math.pow(2, -10 * t1) * Math.cos(t1 * 4 * Math.PI * 0.4);
        arcticX = arcticStartX + (arcticEndX - arcticStartX) * elastic;
        arcticAlpha = Math.min(p * 3, 1);

        const t2 = Math.min(Math.max(p - 0.1, 0) * 1.3, 1);
        const elastic2 = 1 - Math.pow(2, -10 * t2) * Math.cos(t2 * 4 * Math.PI * 0.4);
        zvanX = zvanStartX + (zvanEndX - zvanStartX) * elastic2;
        zvanAlpha = Math.min((p - 0.1) * 3, 1);

        if (p < 0.7) {
          arcticTrail.push({ x: arcticX, alpha: arcticAlpha });
          zvanTrail.push({ x: zvanX, alpha: Math.max(0, zvanAlpha) });
        }
        for (const t of arcticTrail) { t.alpha *= 0.88; }
        for (const t of zvanTrail) { t.alpha *= 0.88; }

        drawTrail(arcticTrail, "Arctic", arcticY);
        drawTrail(zvanTrail, "Zvan", zvanY);

        const glitch = Math.max(0, 1 - p * 2.5);
        drawTextGlow("Arctic", arcticX, arcticY, arcticAlpha, glitch);
        if (zvanAlpha > 0) {
          drawTextGlow("Zvan", zvanX, zvanY, zvanAlpha, glitch);
        }
      }

      // Phase 1: settled + glow pulse
      if (phase === 1) {
        const spike = Math.random() < 0.04 ? 0.35 : 0;
        drawTextGlow("Arctic", arcticEndX, arcticY, 1, spike);
        drawTextGlow("Zvan", zvanEndX, zvanY, 1, spike);

        const pulse = Math.sin(p * Math.PI);
        const glow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 300);
        glow.addColorStop(0, `rgba(192,132,252,${0.08 * pulse})`);
        glow.addColorStop(0.5, `rgba(139,92,246,${0.03 * pulse})`);
        glow.addColorStop(1, "transparent");
        ctx!.fillStyle = glow;
        ctx!.fillRect(0, 0, w, h);
      }

      // Phase 2: text scatters into ring
      if (phase === 2) {
        const fade = 1 - p * 1.3;
        if (fade > 0) {
          drawTextGlow("Arctic", arcticEndX - p * 40, arcticY, fade, p * 0.5);
          drawTextGlow("Zvan", zvanEndX + p * 40, zvanY, fade, p * 0.5);
        }

        const heroRx = Math.min(w * 0.60, 800);
        const scale = p * 0.5;
        const ringRx = heroRx * scale;
        const ringRy = ringRx * 0.25;
        ctx!.save();
        ctx!.translate(cx, cy);
        ctx!.rotate(-0.18);
        const segs = 180;
        for (let i = 0; i < segs; i++) {
          const a = (i / segs) * Math.PI * 2 + time * 0.1;
          const na = ((i + 1) / segs) * Math.PI * 2 + time * 0.1;
          const depth = (Math.sin(a) + 1) / 2;
          const spec = Math.pow(Math.max(0, Math.cos(a * 2 + time * 0.3)), 3);
          const al = p * 0.7 * (0.15 + depth * 0.35 + spec * 0.3);
          ctx!.beginPath();
          ctx!.moveTo(Math.cos(a) * ringRx, Math.sin(a) * ringRy);
          ctx!.lineTo(Math.cos(na) * ringRx, Math.sin(na) * ringRy);
          ctx!.strokeStyle = `rgba(${160 + spec * 80},${150 + spec * 90},${180 + spec * 75},${al})`;
          ctx!.lineWidth = 2 + spec * 1.5;
          ctx!.stroke();
        }
        ctx!.restore();
      }

      // Phase 3: ring grows + fade to page
      if (phase === 3) {
        const heroRx = Math.min(w * 0.60, 800);
        const scale = 0.5 + p * 0.15;
        const ringRx = heroRx * scale;
        const ringRy = ringRx * 0.25;
        const alpha = (1 - p) * 0.8;

        // Fade the whole preloader
        ctx!.globalAlpha = 1 - p;

        ctx!.save();
        ctx!.translate(cx, cy);
        ctx!.rotate(-0.18);
        const segs = 180;
        for (let i = 0; i < segs; i++) {
          const a = (i / segs) * Math.PI * 2 + time * 0.1;
          const na = ((i + 1) / segs) * Math.PI * 2 + time * 0.1;
          const depth = (Math.sin(a) + 1) / 2;
          const spec = Math.pow(Math.max(0, Math.cos(a * 2 + time * 0.3)), 3);
          const al = alpha * (0.15 + depth * 0.35 + spec * 0.3);
          ctx!.beginPath();
          ctx!.moveTo(Math.cos(a) * ringRx, Math.sin(a) * ringRy);
          ctx!.lineTo(Math.cos(na) * ringRx, Math.sin(na) * ringRy);
          ctx!.strokeStyle = `rgba(${160 + spec * 80},${150 + spec * 90},${180 + spec * 75},${al})`;
          ctx!.lineWidth = 2 + spec * 1.5;
          ctx!.stroke();
        }
        ctx!.restore();
        ctx!.globalAlpha = 1;

        if (p >= 1 && !done) {
          done = true;
          onCompleteRef.current();
          return;
        }
      }

      requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100]"
      style={{ background: "#0a0a0f" }}
    />
  );
}
