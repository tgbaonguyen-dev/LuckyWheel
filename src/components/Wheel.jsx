import React, { useRef, useEffect, useCallback } from "react";
import { sound } from "../utils/audio";
import { WHEEL_SLICES } from "../data/gameData.js";

// Bảng màu & biểu tượng cách điệu cao cấp cho 21 nan ô
const SLICE_STYLES = {
  point_1000: { bg: "#8B1D2C", text: "#FFFFFF", icon: "★" },
  point_500:  { bg: "#236B48", text: "#FFFFFF", icon: "✦" },
  point_200:  { bg: "#1D5A85", text: "#FFFFFF", icon: "◆" },
  point_100:  { bg: "#B8822B", text: "#FFFFFF", icon: "●" },
  double:     { bg: "#A81E32", text: "#FFE899", icon: "2X" },
  swap:       { bg: "#2E7570", text: "#FFFFFF", icon: "⇄" },
  divide:     { bg: "#C05638", text: "#FFFFFF", icon: "÷2" },
  lose:       { bg: "#362E2B", text: "#F5EBE1", icon: "✕" },
};

export default function Wheel({ slices = WHEEL_SLICES, onSpinEnd, onSpinStart, isSpinning, disabled, solveDisabled = disabled, onSolveKeyword }) {
  const canvasRef = useRef(null);
  const rotationRef = useRef(0);
  const animFrameRef = useRef(null);
  const lastSliceIdxRef = useRef(-1);

  const activeSlices = (slices && slices.length > 0) ? slices : WHEEL_SLICES;
  const numSlices = activeSlices.length;
  const sliceAngle = (2 * Math.PI) / numSlices;

  // Vẽ vòng quay lên canvas với độ phân giải cao và chi tiết cách điệu kim loại
  const drawWheel = useCallback((rawAngle = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const angle = Number.isFinite(rawAngle) ? rawAngle : 0;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    const width = canvas.width / 2 || 410;
    const height = canvas.height / 2 || 410;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2 - 16;

    try {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // 1. Vẽ 21 Nan Quạt với màu sắc cách điệu và bóng 3D
      for (let i = 0; i < numSlices; i++) {
        const slice = activeSlices[i];
        const startA = i * sliceAngle;
        const endA = startA + sliceAngle;

        // Xác định màu sắc & icon cách điệu
        let style = SLICE_STYLES.point_100;
        if (slice.type === "double") style = SLICE_STYLES.double;
        else if (slice.type === "swap") style = SLICE_STYLES.swap;
        else if (slice.type === "divide") style = SLICE_STYLES.divide;
        else if (slice.type === "lose") style = SLICE_STYLES.lose;
        else if (slice.value === 1000) style = SLICE_STYLES.point_1000;
        else if (slice.value === 500) style = SLICE_STYLES.point_500;
        else if (slice.value === 200) style = SLICE_STYLES.point_200;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startA, endA);
        ctx.closePath();

        // Nền nan quạt
        ctx.fillStyle = slice.color || style.bg;
        ctx.fill();

        // Viền ánh kim thanh mảnh giữa các nan
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
        ctx.stroke();

        // 2. Chữ và biểu tượng trên nan
        ctx.save();
        ctx.rotate(startA + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = slice.textColor || style.text;
        ctx.font = "600 12px Arial, sans-serif";

        const labelText = slice.label;
        ctx.fillText(labelText, radius - 18, 0);
        ctx.restore();
      }

      // 3. Vành đồng mờ kim loại cách điệu (Brushed Brass Rim)
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#B9A47C";
      ctx.stroke();

      // 21 Chốt tán đinh hạt kim loại cổ điển
      for (let i = 0; i < numSlices; i++) {
        const pinA = i * sliceAngle;
        const px = Math.cos(pinA) * (radius - 1);
        const py = Math.sin(pinA) * (radius - 1);

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, 2 * Math.PI);
        ctx.fillStyle = "#FFFDF9";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#78531A";
        ctx.stroke();
      }

      // 4. Trục trung tâm huy hiệu cách điệu (Center Academic Hub)
      // Vòng ngoài trục
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFFDF9";
      ctx.fill();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#C49A45";
      ctx.stroke();

      // Vòng trong đỏ đỗ hoàng gia
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, 2 * Math.PI);
      ctx.fillStyle = "#7E1A27";
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#FFE29A";
      ctx.stroke();

      // Ngôi sao vàng & chữ HCM202 trung tâm
      ctx.fillStyle = "#FFE29A";
      ctx.font = "bold 16px 'Outfit', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("★", 0, -3);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 8px 'Outfit', sans-serif";
      ctx.fillText("HCM202", 0, 11);

      ctx.restore();
    } catch (err) {
      console.error("Canvas draw error:", err);
    }
  }, [activeSlices, numSlices, sliceAngle]);

  // Đảm bảo Canvas luôn được vẽ ngay khi DOM node sẵn sàng
  const setCanvasRef = useCallback((node) => {
    canvasRef.current = node;
    if (node) {
      drawWheel(rotationRef.current || 0);
    }
  }, [drawWheel]);

  useEffect(() => {
    drawWheel(rotationRef.current || 0);
    const r1 = requestAnimationFrame(() => drawWheel(rotationRef.current || 0));
    const t1 = setTimeout(() => drawWheel(rotationRef.current || 0), 50);
    const t2 = setTimeout(() => drawWheel(rotationRef.current || 0), 200);

    return () => {
      cancelAnimationFrame(r1);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [drawWheel, activeSlices]);

  useEffect(() => () => cancelAnimationFrame(animFrameRef.current), []);

  const handleSpin = () => {
    if (isSpinning || disabled) return;

    onSpinStart?.();
    sound.init();
    const minSpins = 5;
    const maxSpins = 8;
    const extraTurns = (minSpins + Math.random() * (maxSpins - minSpins)) * 2 * Math.PI;
    const randomOffset = Math.random() * 2 * Math.PI;
    const targetDelta = extraTurns + randomOffset;
    const startAngle = rotationRef.current || 0;

    const duration = 5200;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 4.2);
      const currentAngle = startAngle + targetDelta * easeOut;
      rotationRef.current = currentAngle;

      const normalized = (2 * Math.PI - (currentAngle % (2 * Math.PI))) % (2 * Math.PI);
      const pointerAngle = (normalized + (3 * Math.PI) / 2) % (2 * Math.PI);
      const currentSliceIdx = Math.floor(pointerAngle / sliceAngle) % numSlices;

      if (currentSliceIdx !== lastSliceIdxRef.current) {
        lastSliceIdxRef.current = currentSliceIdx;
        sound.playTick();
      }

      drawWheel(currentAngle);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        const finalSelectedSlice = activeSlices[currentSliceIdx];
        onSpinEnd(finalSelectedSlice);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  return <div className="wheel-component">
    <div className="wheel-frame"><span className="wheel-pointer" aria-hidden="true" /><canvas ref={setCanvasRef} width={820} height={820} aria-label="Vòng quay điểm thưởng" /></div>
    <div className="wheel-actions"><button className="button primary" onClick={handleSpin} disabled={isSpinning || disabled}>{isSpinning ? "Đang quay…" : "Quay vòng quay"}</button>{onSolveKeyword && <button className="button secondary" onClick={onSolveKeyword} disabled={isSpinning || solveDisabled}>Giải từ khóa</button>}</div>
  </div>;
}
