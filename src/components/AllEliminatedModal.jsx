import React from "react";

export default function AllEliminatedModal({ keyword, onNextRound, onRetryRound }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Vòng chơi kết thúc" className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border-2 border-[#DED8CB] rounded-2xl shadow-xl p-6 text-center text-[#2C2523] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#7E2632]" />

        <div className="text-4xl mb-2">—</div>

        <span className="text-[11px] uppercase font-bold tracking-widest text-[#7E2632] bg-[#7E2632]/10 px-3 py-1 rounded-full font-['Outfit']">
          VÒNG CHƠI KẾT THÚC
        </span>

        <h2 className="text-xl sm:text-2xl font-bold text-[#2C2523] mt-2.5 font-['Playfair_Display']">
          TẤT CẢ CÁC ĐỘI ĐÃ DÙNG QUYỀN ĐOÁN
        </h2>

        <p className="text-xs sm:text-sm text-[#6E6763] mt-1.5 leading-relaxed">
          Do các đội đều chưa giải mã chính xác từ khóa trong lượt đoán trực tiếp, vòng chơi này kết thúc mà không có đội mở khóa thành công.
        </p>

        {/* Đáp án từ khóa */}
        <div className="my-5 p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5D9]">
          <span className="text-xs uppercase tracking-wider text-[#6E6763] font-semibold">
            Từ khóa của chủ đề này là:
          </span>
          <div className="text-lg sm:text-xl font-black font-['Outfit'] text-[#7E2632] mt-1 tracking-wide">
            &ldquo;{keyword}&rdquo;
          </div>
        </div>

        {/* Các nút hành động */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <button
            onClick={onNextRound}
            className="px-6 py-2.5 rounded-xl bg-[#7E2632] hover:bg-[#681C26] text-white font-bold text-xs sm:text-sm shadow-xs cursor-pointer font-['Outfit']"
          >
            Sang vòng chơi tiếp theo &rarr;
          </button>
          <button
            onClick={onRetryRound}
            className="px-5 py-2.5 rounded-xl border border-[#DED8CB] text-[#6E6763] font-semibold text-xs hover:bg-[#FAF8F5] cursor-pointer"
          >
            Mở lại lượt cho vòng này
          </button>
        </div>
      </div>
    </div>
  );
}
