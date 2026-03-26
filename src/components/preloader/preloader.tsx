"use client";

import { useEffect, useRef, useCallback } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

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

    let time = 0;
    let phase = 0;
    let phaseTime = 0;
    let done = false;

    const DURATIONS = [1.4, 0.8, 0.5, 1.0];

    // Arctic: starts far left, lands left-of-center
    // Zvan: starts far right, lands right-of-center
    const arcticStartX = -w * 0.5;
    const arcticEndX = -20;
    const zvanStartX = w * 0.5;
    const zvanEndX = 20;

    let arcticX = arcticStartX;
    let zvanX = zvanStartX;
    let arcticAlpha = 0;
    let zvanAlpha = 0;

    // Trail history
    const arcticTrail: Array<{ x: number; alpha: number }> = [];
    const zvanTrail: Array<{ x: number; alpha: number }> = [];

    function drawTextWithGlow(
      text: string, x: number, y: number, alpha: number, glitch: number
    ) {
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

    function drawTrail(
      trail: Array<{ x: number; alpha: number }>,
      text: string, y: number
    ) {
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

      // Clear: fully transparent base + semi-opaque overlay for trail effect
      ctx!.clearRect(0, 0, w, h);
      const overlayAlpha = phase < 3 ? 0.85 : 0.85 * (1 - p);
      ctx!.fillStyle = `rgba(10,10,15,${overlayAlpha})`;
      ctx!.fillRect(0, 0, w, h);

      const arcticY = cy - fontSize * 0.45;
      const zvanY = cy + fontSize * 0.45;

      // Phase 0: text shoots in from edges
      if (phase === 0) {
        // Elastic ease out
        const t1 = Math.min(p * 1.2, 1);
        const elastic = 1 - Math.pow(2, -10 * t1) * Math.cos(t1 * 4 * Math.PI * 0.4);

        arcticX = arcticStartX + (arcticEndX - arcticStartX) * elastic;
        arcticAlpha = Math.min(p * 3, 1);

        const t2 = Math.min(Math.max(p - 0.1, 0) * 1.3, 1);
        const elastic2 = 1 - Math.pow(2, -10 * t2) * Math.cos(t2 * 4 * Math.PI * 0.4);
        zvanX = zvanStartX + (zvanEndX - zvanStartX) * elastic2;
        zvanAlpha = Math.min((p - 0.1) * 3, 1);

        // Record trail
        if (p < 0.7) {
          arcticTrail.push({ x: arcticX, alpha: arcticAlpha });
          zvanTrail.push({ x: zvanX, alpha: Math.max(0, zvanAlpha) });
        }

        // Decay trails
        for (const t of arcticTrail) { t.alpha *= 0.88; }
        for (const t of zvanTrail) { t.alpha *= 0.88; }

        drawTrail(arcticTrail, "Arctic", arcticY);
        drawTrail(zvanTrail, "Zvan", zvanY);

        const glitch = Math.max(0, 1 - p * 2.5);
        drawTextWithGlow("Arctic", arcticX, arcticY, arcticAlpha, glitch);
        if (zvanAlpha > 0) {
          drawTextWithGlow("Zvan", zvanX, zvanY, zvanAlpha, glitch);
        }
      }

      // Phase 1: text settled, occasional glitch spike + glow pulse
      if (phase === 1) {
        const spike = Math.random() < 0.04 ? 0.35 : 0;
        drawTextWithGlow("Arctic", arcticEndX, arcticY, 1, spike);
        drawTextWithGlow("Zvan", zvanEndX, zvanY, 1, spike);

        const pulse = Math.sin(p * Math.PI);
        const glow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 300);
        glow.addColorStop(0, `rgba(192,132,252,${0.08 * pulse})`);
        glow.addColorStop(0.5, `rgba(139,92,246,${0.03 * pulse})`);
        glow.addColorStop(1, "transparent");
        ctx!.fillStyle = glow;
        ctx!.fillRect(0, 0, w, h);
      }

      // Target ring params must match OrbitRing intro start
      const heroRx = Math.min(w * 0.60, 800);
      const heroRyRatio = 0.25;
      const heroTilt = -0.18;

      function drawRing(rx: number, ry: number, alpha: number, rotation: number) {
        ctx!.save();
        ctx!.translate(cx, cy);
        ctx!.rotate(heroTilt);

        // Metallic segments
        const segs = 180;
        for (let i = 0; i < segs; i++) {
          const a = (i / segs) * Math.PI * 2 + rotation;
          const na = ((i + 1) / segs) * Math.PI * 2 + rotation;
          const x1 = Math.cos(a) * rx;
          const y1 = Math.sin(a) * ry;
          const x2 = Math.cos(na) * rx;
          const y2 = Math.sin(na) * ry;
          const depth = (Math.sin(a) + 1) / 2;
          const spec = Math.pow(Math.max(0, Math.cos(a * 2 + time * 0.3)), 3);
          const r = 160 + spec * 80;
          const g = 150 + spec * 90;
          const b = 180 + spec * 75;
          const segA = alpha * (0.15 + depth * 0.35 + spec * 0.3);
          ctx!.beginPath();
          ctx!.moveTo(x1, y1);
          ctx!.lineTo(x2, y2);
          ctx!.strokeStyle = `rgba(${r},${g},${b},${segA})`;
          ctx!.lineWidth = 2 + spec * 1.5;
          ctx!.stroke();
        }

        // Particles
        const dots = 60;
        for (let i = 0; i < dots; i++) {
          const a = (i / dots) * Math.PI * 2 + rotation * 1.3;
          const depth = (Math.sin(a) + 1) / 2;
          const shimmer = Math.pow(Math.max(0, Math.cos(a * 3 + time)), 4);
          ctx!.beginPath();
          ctx!.arc(Math.cos(a) * rx, Math.sin(a) * ry, 0.6 + depth + shimmer * 1.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(220,215,240,${alpha * (0.05 + depth * 0.15 + shimmer * 0.3)})`;
          ctx!.fill();
        }

        ctx!.restore();
      }

      // Phase 2: text scatters, ring appears from center
      if (phase === 2) {
        const fade = 1 - p * 1.3;
        if (fade > 0) {
          drawTextWithGlow("Arctic", arcticEndX - p * 40, arcticY, fade, p * 0.5);
          drawTextWithGlow("Zvan", zvanEndX + p * 40, zvanY, fade, p * 0.5);
        }

        const scale = p * 0.5;
        drawRing(heroRx * scale, heroRx * scale * heroRyRatio, p * 0.7, time * 0.1);
      }

      // Phase 3: ring grows to match OrbitRing start, then fades
      if (phase === 3) {
        const startScale = 0.5;
        const endScale = 0.65;
        const scale = startScale + p * (endScale - startScale);
        const alpha = (1 - p) * 0.8;

        drawRing(heroRx * scale, heroRx * scale * heroRyRatio, alpha, time * 0.1);

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
      style={{ background: "transparent" }}
    />
  );
}
