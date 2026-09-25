import { useState } from "react";

export default function GuessModal({ currentTeam, onGuessKeyword, onCancel }) {
  const [keywordInput, setKeywordInput] = useState("");
  return <div role="dialog" aria-modal="true" aria-label="Đoán từ khóa" className="modal-overlay fixed inset-0 z-50 flex items-center justify-center">
    <div className="relative w-full max-w-xl">
      <div className="text-center mb-5"><span className="eyebrow">Giải từ khóa</span><h3>{currentTeam.name}</h3></div>
          <div className="space-y-3.5">
            <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-950 font-medium">
              <span className="font-bold text-[#8E1B24]">Lưu ý:</span> Mỗi đội chỉ được đoán trực tiếp từ khóa 01 lần trong vòng. Nếu đoán sai, đội sẽ <strong>bị loại</strong> khỏi vòng chơi hiện tại!
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2C2523] uppercase tracking-wider mb-1.5">
                Nhập từ khóa dự đoán (không cần gõ dấu):
              </label>
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value.toUpperCase())}
                placeholder="VÍ DỤ: KHONG CO GI QUY HON DOC LAP TU DO"
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#DED8CB] focus:border-[#7E2632] rounded-xl text-sm font-bold font-['Outfit'] text-[#2C2523] focus:outline-none uppercase tracking-wider"
                autoFocus
              />
            </div>

            <div className="flex gap-2.5 pt-1">
              <button
                onClick={() => onCancel()}
                className="w-1/3 py-2.5 rounded-xl border border-[#DED8CB] font-semibold text-xs text-[#5C5550] hover:bg-[#F6F3EC] cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (keywordInput.trim()) {
                    onGuessKeyword(keywordInput.trim());
                  }
                }}
                disabled={!keywordInput.trim()}
                className="w-2/3 py-2.5 rounded-xl bg-[#7E2632] hover:bg-[#681C26] text-white font-bold text-sm disabled:opacity-50 shadow-sm cursor-pointer"
              >
                Xác nhận đoán từ khóa
              </button>
            </div>
          </div>
    </div>
  </div>;
}
