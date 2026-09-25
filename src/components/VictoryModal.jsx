import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { sound } from "../utils/audio";

export default function VictoryModal({ winnerTeam, reason, onNextRound, onResetGame }) {
  useEffect(() => {
    sound.playVictory();

    // Pháo hoa nhẹ nhàng thanh lịch màu đỏ đỗ, vàng ấm và kem
    const end = Date.now() + 2.5 * 1000;
    const colors = ["#7E2632", "#C49A45", "#5E7E6B", "#FAF8F5"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 50,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 50,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div role="dialog" aria-modal="true" aria-label="Kết quả vòng chơi" className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border-2 border-[#DED8CB] rounded-2xl shadow-xl p-7 text-center text-[#2C2523] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#7E2632]" />

        <div className="text-4xl mb-2">★</div>

        <span className="text-[11px] uppercase font-bold tracking-widest text-[#7E2632] bg-[#7E2632]/10 px-3 py-1 rounded-full font-['Outfit']">
          CHÚC MỪNG CHIẾN THẮNG
        </span>

        <h2 className="text-xl sm:text-2xl font-bold text-[#2C2523] mt-2.5 font-['Playfair_Display']">
          {winnerTeam?.name} GIẢI MÃ THÀNH CÔNG!
        </h2>

        <p className="text-xs sm:text-sm text-[#6E6763] mt-1.5 italic">
          {reason}
        </p>

        <div className="my-5 p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5D9]">
          <span className="text-xs uppercase tracking-wider text-[#6E6763] font-semibold">
            Tổng điểm hiện có của đội
          </span>
          <div className="text-3xl sm:text-4xl font-black font-['JetBrains_Mono'] text-[#7E2632] mt-1">
            {winnerTeam?.score?.toLocaleString("vi-VN")} điểm
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <button
            onClick={onNextRound}
            className="px-6 py-2.5 rounded-xl bg-[#7E2632] hover:bg-[#681C26] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer font-['Outfit']"
          >
            Sang vòng chơi tiếp theo &rarr;
          </button>
          <button
            onClick={onResetGame}
            className="px-5 py-2.5 rounded-xl border border-[#DED8CB] text-[#6E6763] font-semibold text-xs hover:bg-[#FAF8F5] cursor-pointer"
          >
            Bắt đầu lại từ đầu
          </button>
        </div>
      </div>
    </div>
  );
}
