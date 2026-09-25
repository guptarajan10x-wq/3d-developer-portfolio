import * as THREE from "three";
import { portfolioVideo } from "../../assets/index.js";

// Safe rounded rectangle helper compatible with all browsers
function safeRoundRect(ctx, x, y, w, h, r = 4) {
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, r);
  } else {
    // Standard bezier curve rounded rectangle fallback
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

/**
 * High-performance 60fps Motion Graphic Canvas Engine
 * Displays cybernetic HUD, 3D wireframe projections, audio spectrum visualizer,
 * and optional live video showreel onto the 3D monitor screen.
 */
export class ScreenMotionGraphicEngine {
  constructor() {
    this.width = 1280;
    this.height = 720;

    // Create 2D offscreen canvas
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d", { alpha: false });

    // Mode: "motion_hud" | "showreel" | "fusion"
    this.mode = "motion_hud";
    this.modeNotification = "";
    this.modeNotificationTimer = 0;

    // Simulated audio frequency visualizer state
    this.barsCount = 44;
    this.barHeights = new Float32Array(this.barsCount);
    this.peakHeights = new Float32Array(this.barsCount);

    this.tickers = [
      "3D CGI • VISUAL EFFECTS • GENERATIVE AI",
      "AFTER EFFECTS • BLENDER • CINEMA 4D • THREE.JS",
      "COMMERCIAL MOTION • KINETIC TYPE • COLOR GRADING",
      "CREATIVE DIRECTION • AI SYNTHETICS • REALTIME 3D",
    ];

    // Lazy video player
    this.video = null;
    this.videoReady = false;

    // Three.js CanvasTexture
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.flipY = true;
    if (THREE.sRGBEncoding) {
      this.texture.encoding = THREE.sRGBEncoding;
    }
    this.texture.generateMipmaps = false;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    // Draw initial frame immediately
    this.drawMotionGraphic(0);
    this.texture.needsUpdate = true;
  }

  ensureVideo() {
    if (!this.video) {
      try {
        this.video = document.createElement("video");
        this.video.src = portfolioVideo;
        this.video.crossOrigin = "anonymous";
        this.video.loop = true;
        this.video.muted = true;
        this.video.playsInline = true;
        this.video.setAttribute("playsinline", "");
        this.video.setAttribute("webkit-playsinline", "");
        this.video.autoplay = true;

        this.video.addEventListener("canplay", () => {
          this.videoReady = true;
        }, { once: true });

        this.video.play().catch(() => {});
      } catch (e) {
        console.warn("Video initialization notice:", e);
      }
    } else if (this.video.paused) {
      this.video.play().catch(() => {});
    }
  }

  setMode(newMode) {
    this.mode = newMode;
    const names = {
      motion_hud: "⚡ CYBER MOTION HUD",
      showreel: "🎬 SHOWREEL VIDEO REEL",
      fusion: "✨ FUSION: VIDEO + HUD",
    };
    this.modeNotification = names[newMode] || newMode.toUpperCase();
    this.modeNotificationTimer = performance.now() + 2500;

    if (newMode !== "motion_hud") {
      this.ensureVideo();
    }
  }

  cycleMode() {
    const modes = ["motion_hud", "showreel", "fusion"];
    const nextIdx = (modes.indexOf(this.mode) + 1) % modes.length;
    this.setMode(modes[nextIdx]);
    return modes[nextIdx];
  }

  update(time) {
    const ctx = this.ctx;
    if (!ctx) return;

    const w = this.width;
    const h = this.height;

    try {
      if (this.mode === "showreel") {
        this.drawVideoMode(time, false);
      } else if (this.mode === "fusion") {
        this.drawVideoMode(time, true);
      } else {
        this.drawMotionGraphic(time);
      }

      if (performance.now() < this.modeNotificationTimer) {
        this.drawNotification(ctx, w, h);
      }
    } catch (err) {
      console.warn("Screen render exception:", err);
    }

    this.texture.needsUpdate = true;
  }

  drawVideoMode(time, isFusion) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    let hasVideoFrame = false;
    if (this.video && this.video.readyState >= 2 && !this.video.paused) {
      try {
        ctx.drawImage(this.video, 0, 0, w, h);
        hasVideoFrame = true;
      } catch (e) {
        hasVideoFrame = false;
      }
    }

    if (!hasVideoFrame) {
      this.drawMotionGraphic(time);
      ctx.fillStyle = "rgba(5, 8, 22, 0.78)";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "#00cea8";
      ctx.font = "bold 24px monospace";
      ctx.textAlign = "center";
      ctx.fillText("BUFFERING SHOWREEL STREAM...", w / 2, h / 2 - 20);

      ctx.save();
      ctx.translate(w / 2, h / 2 + 30);
      ctx.rotate(time * 4);
      ctx.strokeStyle = "#915EFF";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 1.5);
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (isFusion) {
      ctx.fillStyle = "rgba(7, 10, 28, 0.35)";
      ctx.fillRect(0, 0, w, h);
      this.drawWireframePolyhedron(ctx, w - 180, 170, 75, time);
    }

    this.drawTopBar(ctx, w, time, isFusion ? "FUSION REEL // LIVE" : "SHOWREEL // LIVE");
    this.drawAudioVisualizer(ctx, w, h, time, true);
    this.drawCornerBrackets(ctx, w, h);
    this.drawScanlines(ctx, w, h);
  }

  drawMotionGraphic(time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Background gradient
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 80, w / 2, h / 2, w * 0.75);
    bgGrad.addColorStop(0, "#190a36");
    bgGrad.addColorStop(0.5, "#0b061e");
    bgGrad.addColorStop(1, "#04050d");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 3D perspective horizon grid
    this.drawPerspectiveGrid(ctx, w, h, time);

    // Cyber dust particles
    this.drawParticles(ctx, w, h, time);

    // Rotating 3D wireframe core
    this.drawWireframePolyhedron(ctx, w * 0.32, h * 0.46, 125, time);

    // Kinetic typography & badges
    this.drawKineticTypography(ctx, w, h, time);

    // Frequency equalizer & audio wave
    this.drawAudioVisualizer(ctx, w, h, time, false);

    // Top status header
    this.drawTopBar(ctx, w, time, "MOTION SYNTH // 60 FPS");

    // Scanlines and framing
    this.drawCornerBrackets(ctx, w, h);
    this.drawScanlines(ctx, w, h);
  }

  drawPerspectiveGrid(ctx, w, h, time) {
    ctx.save();
    const horizonY = h * 0.42;
    const cx = w * 0.5;

    // Horizon glow
    const horizGlow = ctx.createRadialGradient(cx, horizonY, 10, cx, horizonY, 400);
    horizGlow.addColorStop(0, "rgba(145, 94, 255, 0.4)");
    horizGlow.addColorStop(0.5, "rgba(0, 206, 168, 0.15)");
    horizGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = horizGlow;
    ctx.fillRect(0, horizonY - 40, w, 120);

    // Radial perspective lines
    ctx.strokeStyle = "rgba(145, 94, 255, 0.25)";
    ctx.lineWidth = 1.2;
    const numRadials = 16;
    for (let i = -numRadials; i <= numRadials; i++) {
      const bottomX = cx + i * (w / (numRadials * 0.85));
      ctx.beginPath();
      ctx.moveTo(cx, horizonY);
      ctx.lineTo(bottomX, h);
      ctx.stroke();
    }

    // Moving horizontal grid lines
    const speed = 40;
    const offset = (time * speed) % 35;
    for (let d = 0; d < 8; d++) {
      const tNorm = Math.pow((d * 35 + offset) / 300, 2);
      const lineY = horizonY + tNorm * (h - horizonY);
      if (lineY <= h) {
        ctx.strokeStyle = `rgba(0, 206, 168, ${0.08 + tNorm * 0.32})`;
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(w, lineY);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  drawWireframePolyhedron(ctx, cx, cy, radius, time) {
    ctx.save();
    const rx = time * 0.8;
    const ry = time * 1.1;
    const rz = time * 0.5;

    // Concentric rotating rings
    ctx.strokeStyle = "rgba(0, 206, 168, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 12]);
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.55, time * 0.5, time * 0.5 + Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(145, 94, 255, 0.45)";
    ctx.setLineDash([18, 8, 4, 8]);
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.35, -time * 0.7, -time * 0.7 + Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glowing core
    const coreGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, radius * 0.9);
    coreGrad.addColorStop(0, "rgba(0, 206, 168, 0.5)");
    coreGrad.addColorStop(0.5, "rgba(145, 94, 255, 0.28)");
    coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.9, 0, Math.PI * 2);
    ctx.fill();

    // 3D Vertices
    const baseVerts = [
      [-1, -1, -1], [ 1, -1, -1], [ 1,  1, -1], [-1,  1, -1],
      [-1, -1,  1], [ 1, -1,  1], [ 1,  1,  1], [-1,  1,  1],
      [ 0, -1.5, 0], [ 0, 1.5, 0], [ 1.5, 0, 0], [-1.5, 0, 0],
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      [8, 0], [8, 1], [8, 4], [8, 5],
      [9, 2], [9, 3], [9, 6], [9, 7],
      [10, 1], [10, 2], [10, 5], [10, 6],
      [11, 0], [11, 3], [11, 4], [11, 7],
    ];

    const proj = [];
    const fov = 400;

    for (let i = 0; i < baseVerts.length; i++) {
      let [x, y, z] = baseVerts[i];
      x *= radius * 0.65;
      y *= radius * 0.65;
      z *= radius * 0.65;

      let x1 = x * Math.cos(ry) + z * Math.sin(ry);
      let z1 = -x * Math.sin(ry) + z * Math.cos(ry);

      let y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = y * Math.sin(rx) + z1 * Math.cos(rx);

      let x3 = x1 * Math.cos(rz) - y2 * Math.sin(rz);
      let y3 = x1 * Math.sin(rz) + y2 * Math.cos(rz);

      const scale = fov / (fov + z2 + 250);
      proj.push([cx + x3 * scale, cy + y3 * scale, scale]);
    }

    ctx.lineWidth = 1.8;
    for (let i = 0; i < edges.length; i++) {
      const [p1, p2] = edges[i];
      const v1 = proj[p1];
      const v2 = proj[p2];

      const grad = ctx.createLinearGradient(v1[0], v1[1], v2[0], v2[1]);
      grad.addColorStop(0, "rgba(0, 206, 168, 0.85)");
      grad.addColorStop(1, "rgba(145, 94, 255, 0.85)");
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(v1[0], v1[1]);
      ctx.lineTo(v2[0], v2[1]);
      ctx.stroke();
    }

    for (let i = 0; i < proj.length; i++) {
      const [px, py, sc] = proj[i];
      ctx.fillStyle = i % 2 === 0 ? "#00cea8" : "#915EFF";
      ctx.beginPath();
      ctx.arc(px, py, 3.2 * sc, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawParticles(ctx, w, h, time) {
    ctx.save();
    ctx.fillStyle = "rgba(145, 94, 255, 0.45)";
    for (let i = 0; i < 28; i++) {
      const px = (Math.sin(i * 99 + time * 0.3) * 0.5 + 0.5) * w;
      const py = (Math.cos(i * 33 + time * 0.25) * 0.5 + 0.5) * h;
      const sz = (Math.sin(i + time * 2) * 0.5 + 0.5) * 2 + 1;
      ctx.beginPath();
      ctx.arc(px, py, sz, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawKineticTypography(ctx, w, h, time) {
    ctx.save();
    const rightX = w * 0.54;
    const midY = h * 0.38;

    ctx.fillStyle = "#00cea8";
    ctx.font = "bold 13px 'Courier New', monospace";
    ctx.fillText("// CREATIVE MOTION LABS", rightX, midY - 45);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 46px sans-serif";
    ctx.shadowColor = "#915EFF";
    ctx.shadowBlur = 18;
    ctx.fillText("RAJAN", rightX, midY + 4);

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#915EFF";
    ctx.font = "700 20px sans-serif";
    ctx.fillText("MOTION DESIGNER & TECHNOLOGIST", rightX, midY + 34);

    const tickerIdx = Math.floor(time * 0.35) % this.tickers.length;
    const tickerText = this.tickers[tickerIdx];

    ctx.fillStyle = "rgba(145, 94, 255, 0.15)";
    ctx.strokeStyle = "rgba(145, 94, 255, 0.4)";
    ctx.lineWidth = 1;
    const pillW = 460;
    const pillH = 32;

    safeRoundRect(ctx, rightX, midY + 54, pillW, pillH, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#00cea8";
    ctx.beginPath();
    ctx.arc(rightX + 16, midY + 70, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#d8c5ff";
    ctx.font = "600 12px 'Courier New', monospace";
    ctx.fillText(tickerText, rightX + 30, midY + 74);

    const metricY = midY + 115;
    this.drawMetricBadge(ctx, rightX, metricY, "COMPOSITION", "HERO_REEL_4K");
    this.drawMetricBadge(ctx, rightX + 160, metricY, "FRAMERATE", "60.00 FPS");
    this.drawMetricBadge(ctx, rightX + 300, metricY, "ENGINE", "REALTIME CGI");

    ctx.restore();
  }

  drawMetricBadge(ctx, x, y, label, val) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.font = "10px monospace";
    ctx.fillText(label, x, y);
    ctx.fillStyle = "#00cea8";
    ctx.font = "bold 13px monospace";
    ctx.fillText(val, x, y + 16);
  }

  drawAudioVisualizer(ctx, w, h, time, isVideoOverlay) {
    ctx.save();
    const count = this.barsCount;
    const paddingX = 80;
    const availWidth = w - paddingX * 2;
    const barWidth = availWidth / count - 5;
    const baseY = h - 60;
    const maxHeight = isVideoOverlay ? 90 : 130;

    // Oscilloscope waveform
    ctx.beginPath();
    ctx.strokeStyle = isVideoOverlay ? "rgba(0, 206, 168, 0.6)" : "rgba(0, 206, 168, 0.85)";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00cea8";
    ctx.shadowBlur = 10;

    for (let i = 0; i <= count; i++) {
      const bx = paddingX + i * (barWidth + 5);
      const waveVal =
        Math.sin(time * 5 + i * 0.3) * 18 +
        Math.cos(time * 3 - i * 0.45) * 12 +
        Math.sin(time * 8 + i * 0.15) * 6;
      const by = baseY - 8 - Math.abs(waveVal);
      if (i === 0) ctx.moveTo(bx, by);
      else ctx.lineTo(bx, by);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Frequency Bars
    for (let i = 0; i < count; i++) {
      const freq =
        Math.sin(time * 4.5 + i * 0.28) * 0.4 +
        Math.cos(time * 3.2 - i * 0.42) * 0.35 +
        Math.sin(time * 7 + i * 0.15) * 0.25;

      const targetHeight = Math.max(10, Math.abs(freq) * maxHeight);
      this.barHeights[i] += (targetHeight - this.barHeights[i]) * 0.35;

      if (this.barHeights[i] > this.peakHeights[i]) {
        this.peakHeights[i] = this.barHeights[i];
      } else {
        this.peakHeights[i] = Math.max(0, this.peakHeights[i] - 1.2);
      }

      const bx = paddingX + i * (barWidth + 5);
      const currentH = this.barHeights[i];

      const barGrad = ctx.createLinearGradient(bx, baseY, bx, baseY - currentH);
      barGrad.addColorStop(0, "rgba(0, 206, 168, 0.85)");
      barGrad.addColorStop(0.6, "rgba(145, 94, 255, 0.95)");
      barGrad.addColorStop(1, "rgba(255, 60, 160, 0.95)");

      ctx.fillStyle = barGrad;
      safeRoundRect(ctx, bx, baseY - currentH, barWidth, currentH, 2);
      ctx.fill();

      const peakY = baseY - this.peakHeights[i] - 3;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(bx, peakY, barWidth, 2);
    }

    // Timeline Scrubber
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(paddingX, baseY + 20);
    ctx.lineTo(w - paddingX, baseY + 20);
    ctx.stroke();

    const playheadX = paddingX + ((time * 65) % availWidth);
    ctx.fillStyle = "#00cea8";
    ctx.beginPath();
    ctx.arc(playheadX, baseY + 20, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.font = "10px monospace";
    ctx.fillText("TIMELINE // 00:00:00", paddingX, baseY + 36);
    ctx.textAlign = "right";
    ctx.fillText("RENDER ACTIVE // 60 FPS", w - paddingX, baseY + 36);
    ctx.textAlign = "left";

    ctx.restore();
  }

  drawTopBar(ctx, w, time, channelText) {
    ctx.save();
    const topY = 48;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, topY + 12);
    ctx.lineTo(w - 50, topY + 12);
    ctx.stroke();

    const pulse = Math.sin(time * 6) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255, 59, 92, ${0.4 + pulse * 0.6})`;
    ctx.beginPath();
    ctx.arc(65, topY - 2, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px 'Courier New', monospace";
    ctx.fillText(channelText, 82, topY + 2);

    const totalSecs = Math.floor(time);
    const mins = String(Math.floor(totalSecs / 60)).padStart(2, "0");
    const secs = String(totalSecs % 60).padStart(2, "0");
    const frames = String(Math.floor((time % 1) * 60)).padStart(2, "0");
    const timecode = `TC 00:${mins}:${secs}:${frames}`;

    ctx.fillStyle = "#00cea8";
    ctx.font = "bold 15px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText(timecode, w / 2, topY + 2);

    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = "11px 'Courier New', monospace";
    ctx.fillText("RAJAN_OS v4.2 // HDR ENABLED", w - 65, topY + 2);

    ctx.restore();
  }

  drawCornerBrackets(ctx, w, h) {
    ctx.save();
    ctx.strokeStyle = "rgba(0, 206, 168, 0.6)";
    ctx.lineWidth = 2.5;

    const len = 28;
    const margin = 35;

    ctx.beginPath();
    ctx.moveTo(margin, margin + len);
    ctx.lineTo(margin, margin);
    ctx.lineTo(margin + len, margin);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w - margin - len, margin);
    ctx.lineTo(w - margin, margin);
    ctx.lineTo(w - margin, margin + len);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(margin, h - margin - len);
    ctx.lineTo(margin, h - margin);
    ctx.lineTo(margin + len, h - margin);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(w - margin - len, h - margin);
    ctx.lineTo(w - margin, h - margin);
    ctx.lineTo(w - margin, h - margin - len);
    ctx.stroke();

    ctx.restore();
  }

  drawScanlines(ctx, w, h) {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 1.5);
    }

    const vignette = ctx.createRadialGradient(w / 2, h / 2, w * 0.42, w / 2, h / 2, w * 0.72);
    vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.55)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
  }

  drawNotification(ctx, w, h) {
    ctx.save();
    const toastW = 380;
    const toastH = 46;
    const tx = (w - toastW) / 2;
    const ty = h * 0.16;

    ctx.fillStyle = "rgba(9, 3, 28, 0.92)";
    ctx.strokeStyle = "#00cea8";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "#00cea8";
    ctx.shadowBlur = 12;

    safeRoundRect(ctx, tx, ty, toastW, toastH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(this.modeNotification, w / 2, ty + 28);

    ctx.restore();
  }

  destroy() {
    if (this.video) {
      try {
        this.video.pause();
        this.video.src = "";
        this.video.load();
      } catch (e) {}
      this.video = null;
    }
    if (this.texture) {
      this.texture.dispose();
    }
  }
}
