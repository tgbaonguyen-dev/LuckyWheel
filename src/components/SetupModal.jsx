import React, { useState } from "react";
import { SAMPLE_ROUNDS } from "../data/gameData";

export default function SetupModal({ teams, currentRound, onSaveSetup, onClose }) {
  const [teamList, setTeamList] = useState(teams.map((t) => ({ ...t })));
  const [selectedRoundIdx, setSelectedRoundIdx] = useState(() => Math.max(0, SAMPLE_ROUNDS.findIndex(round => round.id === currentRound.id)));

  const handleAddTeam = () => {
    if (teamList.length >= 8) return;
    const newId = Date.now();
    const colors = ["#8E3B46", "#4E7B73", "#B88A4E", "#628093", "#B86B5A", "#5E7E6B"];
    setTeamList([
      ...teamList,
      {
        id: newId,
        name: `Đội ${teamList.length + 1}`,
        score: 0,
        color: colors[teamList.length % colors.length],
        isEliminated: false,
        hasGuessedKeyword: false,
      },
    ]);
  };

  const handleRemoveTeam = (id) => {
    if (teamList.length <= 2) return;
    setTeamList(teamList.filter((t) => t.id !== id));
  };

  const handleNameChange = (id, newName) => {
    setTeamList(teamList.map((t) => (t.id === id ? { ...t, name: newName } : t)));
  };

  const handleSave = () => {
    onSaveSetup(teamList, SAMPLE_ROUNDS[selectedRoundIdx]);
    onClose();
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Cấu hình trò chơi" className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border-2 border-[#DED8CB] rounded-2xl shadow-xl p-6 text-[#2C2523] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#7E2632]" />

        <div className="flex items-center justify-between mb-4 border-b border-[#EAE5D9] pb-3">
          <h3 className="font-bold text-base md:text-lg text-[#2C2523] font-['Playfair_Display'] flex items-center gap-2">
            <svg className="w-5 h-5 text-[#8E1B24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Cấu hình trò chơi</span>
          </h3>
          <button
            onClick={onClose}
            className="text-[#8E8681] hover:text-[#2C2523] text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Danh sách các đội */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#8E1B24]">
              Danh sách đội thi ({teamList.length} đội):
            </label>
            {teamList.length < 8 && (
              <button
                type="button"
                onClick={handleAddTeam}
                className="text-xs font-bold text-[#4E7B73] hover:underline cursor-pointer"
              >
                + Thêm đội
              </button>
            )}
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {teamList.map((team, idx) => (
              <div key={team.id} className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#8E8681] w-6 text-center">
                  #{idx + 1}
                </span>
                <input
                  type="text"
                  aria-label={`Tên đội ${idx + 1}`}
                  value={team.name}
                  onChange={(e) => handleNameChange(team.id, e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#FAF8F5] border border-[#DED8CB] focus:border-[#8E1B24] rounded-lg text-xs font-medium text-[#2C2523] focus:outline-none"
                  placeholder="Tên đội..."
                />
                {teamList.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTeam(team.id)}
                    className="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Xóa đội này"
                  >
                    <svg className="w-4 h-4 text-[#8E1B24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chọn vòng chơi / Từ khóa */}
        <div className="mb-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#7E2632] mb-1.5">
            Chọn chủ đề vòng chơi:
          </label>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {SAMPLE_ROUNDS.map((round, idx) => (
              <label
                key={round.id}
                className={`block p-2 rounded-xl border cursor-pointer text-xs transition-all ${
                  selectedRoundIdx === idx
                    ? "border-[#7E2632] bg-[#FFFBFB] ring-1 ring-[#7E2632]"
                    : "border-[#EAE5D9] bg-[#FAF8F5] hover:border-[#DED8CB]"
                }`}
              >
                <input
                  type="radio"
                  name="roundSelection"
                  checked={selectedRoundIdx === idx}
                  onChange={() => setSelectedRoundIdx(idx)}
                  className="mr-2 accent-[#7E2632]"
                />
                <strong className="text-[#2C2523]">{round.topic}</strong>
                <p className="text-[#6E6763] mt-0.5 italic font-mono">
                  &ldquo;{round.displayKeyword}&rdquo;
                </p>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-[#EAE5D9]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#DED8CB] rounded-xl text-xs font-semibold text-[#6E6763] hover:bg-[#FAF8F5] cursor-pointer"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-[#7E2632] hover:bg-[#681C26] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer font-['Outfit']"
          >
            Áp dụng cấu hình
          </button>
        </div>
      </div>
    </div>
  );
}
