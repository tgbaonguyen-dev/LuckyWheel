import React, { useState } from "react";

export default function SwapModal({ currentTeam, otherTeams, onConfirmSwap }) {
  const [targetTeamId, setTargetTeamId] = useState(
    otherTeams.length > 0 ? otherTeams[0].id : null
  );

  return (
    <div role="dialog" aria-modal="true" aria-label="Đổi điểm" className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FFFFFF] border-2 border-[#DED8CB] rounded-2xl shadow-xl p-6 text-[#2C2523] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#4E7B73]" />

        <div className="text-center mb-4">
          <span className="text-3xl">⇄</span>
          <h3 className="text-lg font-bold text-[#2C2523] mt-1 font-['Playfair_Display']">
            Đổi điểm
          </h3>
          <p className="text-xs text-[#6E6763] mt-1">
            <strong>{currentTeam.name}</strong> ({currentTeam.score} điểm) chọn một đội để đổi điểm:
          </p>
        </div>

        <div className="space-y-2 mb-4">
          {otherTeams.map((team) => (
            <label
              key={team.id}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                targetTeamId === team.id
                  ? "border-[#4E7B73] bg-[#F0F6F5] ring-2 ring-[#4E7B73]/20"
                  : "border-[#EAE5D9] bg-[#FAF8F5] hover:border-[#DED8CB]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="swapTarget"
                  checked={targetTeamId === team.id}
                  onChange={() => setTargetTeamId(team.id)}
                  className="accent-[#4E7B73]"
                />
                <span className="font-bold text-xs sm:text-sm text-[#2C2523]">{team.name}</span>
              </div>
              <span className="font-mono font-bold text-sm text-[#7E2632]">
                {team.score} điểm
              </span>
            </label>
          ))}
        </div>

        <button
          onClick={() => onConfirmSwap(targetTeamId)}
          disabled={!targetTeamId}
          className="w-full py-2.5 bg-[#4E7B73] hover:bg-[#3D645D] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer"
        >
          Xác nhận đổi điểm & Trả lời câu hỏi &rarr;
        </button>
      </div>
    </div>
  );
}
