import React, { useState, useMemo } from "react";
import Wheel from "./components/Wheel";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import QuizModal from "./components/QuizModal";
import GuessModal from "./components/GuessModal";
import SwapModal from "./components/SwapModal";
import SetupModal from "./components/SetupModal";
import VictoryModal from "./components/VictoryModal";
import AllEliminatedModal from "./components/AllEliminatedModal";
import {
  WHEEL_SLICES,
  SAMPLE_ROUNDS,
  DEFAULT_TEAMS,
  ALPHABET_A_Z,
  getBaseVietnameseLetter,
  normalizeForKeywordComparison,
} from "./data/gameData";
import { sound } from "./utils/audio";

export default function App() {
  // 1. Quản lý danh sách đội & vòng chơi
  const [teams, setTeams] = useState(DEFAULT_TEAMS);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const currentRound = SAMPLE_ROUNDS[currentRoundIdx];

  // 2. Trạng thái giải mã ô chữ
  const [currentTeamIdx, setCurrentTeamIdx] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);

  // 3. Trạng thái tương tác game
  // "IDLE" | "SPINNING" | "SWAP_SELECT" | "QUIZ" | "GUESSING" | "ROUND_WON" | "ALL_ELIMINATED"
  const [gameStatus, setGameStatus] = useState("IDLE");
  const [currentSlice, setCurrentSlice] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Điểm tạm thời của lượt quay (Chỉ cộng khi đoán đúng chữ cái hoặc từ khóa)
  const [pendingPoints, setPendingPoints] = useState(0);
  // Mục tiêu Swap điểm đang chờ duyệt qua câu hỏi trắc nghiệm
  const [pendingSwapTargetId, setPendingSwapTargetId] = useState(null);

  const [, setStatusMessage] = useState(
    `Mời ${DEFAULT_TEAMS[0].name} quay vòng quay.`
  );

  // 4. Modal điều khiển
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [keywordReturnStatus, setKeywordReturnStatus] = useState("IDLE");
  const [letterInput, setLetterInput] = useState("");

  // Đội đang có lượt chơi
  const currentTeam = teams[currentTeamIdx] || teams[0];

  // Danh sách các ký tự cơ bản cần mở trong từ khóa hiện tại
  const uniqueBaseLettersInKeyword = useMemo(() => {
    return Array.from(
      new Set(
        currentRound.displayKeyword
          .replace(/\s+/g, "")
          .split("")
          .map(getBaseVietnameseLetter)
      )
    );
  }, [currentRound.displayKeyword]);

  // Tổng số chữ cái trong từ khóa (không tính khoảng trắng)
  const totalLetterCount = useMemo(() => {
    return currentRound.displayKeyword.replace(/\s+/g, "").length;
  }, [currentRound.displayKeyword]);

  // Số lượng chữ cái đã được lật mở
  const revealedCount = useMemo(() => {
    return currentRound.displayKeyword
      .replace(/\s+/g, "")
      .split("")
      .filter((char) => revealedLetters.includes(getBaseVietnameseLetter(char))).length;
  }, [currentRound.displayKeyword, revealedLetters]);

  // Kiểm tra xem tất cả các đội có bị loại hết chưa
  const checkAllEliminated = (teamsList) => {
    return teamsList.every((t) => t.isEliminated);
  };

  // Chuyển sang đội tiếp theo
  const advanceToNextTeam = (customTeams = teams, currentIdx = currentTeamIdx) => {
    if (checkAllEliminated(customTeams)) {
      setGameStatus("ALL_ELIMINATED");
      setStatusMessage("Tất cả các đội đều đã bị loại trong vòng này!");
      return;
    }

    let nextIdx = (currentIdx + 1) % customTeams.length;
    let attempts = 0;

    while (customTeams[nextIdx].isEliminated && attempts < customTeams.length) {
      nextIdx = (nextIdx + 1) % customTeams.length;
      attempts++;
    }

    if (attempts >= customTeams.length) {
      setGameStatus("ALL_ELIMINATED");
      setStatusMessage("Tất cả các đội đều đã bị loại trong vòng này!");
      return;
    }

    setCurrentTeamIdx(nextIdx);
    setGameStatus("IDLE");
    setCurrentSlice(null);
    setPendingPoints(0);
    setPendingSwapTargetId(null);
    setStatusMessage(`Lượt chơi tiếp theo: ${customTeams[nextIdx].name}. Mời quay vòng quay!`);
  };

  // 1. Xử lý khi Vòng quay dừng
  const handleSpinEnd = (slice) => {
    setCurrentSlice(slice);

    // TH 1: Ô Mất lượt
    if (slice.type === "lose") {
      sound.playWrong();
      setStatusMessage(`Ô MẤT LƯỢT! ${currentTeam.name} mất lượt chơi.`);
      setTimeout(() => {
        advanceToNextTeam();
      }, 1800);
      return;
    }

    // TH 2: Ô Chia đôi điểm
    if (slice.type === "divide") {
      const halvedScore = Math.floor(currentTeam.score * 0.5);
      const updatedTeams = teams.map((t, idx) =>
        idx === currentTeamIdx ? { ...t, score: halvedScore } : t
      );
      setTeams(updatedTeams);
      setPendingPoints(0);
      setStatusMessage(`Ô CHIA ĐÔI! Điểm của ${currentTeam.name} giảm còn ${halvedScore} điểm. Đang chuẩn bị câu hỏi...`);

      setTimeout(() => {
        openNextQuiz();
      }, 1400);
      return;
    }

    // TH 3: Ô Nhân đôi điểm
    if (slice.type === "double") {
      setPendingPoints(1000);
      setStatusMessage(`Ô NHÂN ĐÔI! Cơ hội nhận +1000 điểm nếu trả lời đúng và đoán trúng.`);

      setTimeout(() => {
        openNextQuiz();
      }, 1400);
      return;
    }

    // TH 4: Ô Swap điểm
    if (slice.type === "swap") {
      const otherTeams = teams.filter((t, idx) => idx !== currentTeamIdx && !t.isEliminated);
      if (otherTeams.length === 0) {
        setPendingPoints(200);
        openNextQuiz();
      } else {
        setGameStatus("SWAP_SELECT");
      }
      return;
    }

    // TH 5: Ô điểm số thông thường (+100, +200, +500, +1000)
    if (slice.type === "point") {
      setPendingPoints(slice.value);
      setStatusMessage(`Ô ${slice.label}! Trả lời câu hỏi để giành quyền đoán.`);
      setTimeout(() => {
        openNextQuiz();
      }, 1200);
    }
  };

  // Mở câu hỏi trắc nghiệm tiếp theo
  const openNextQuiz = () => {
    const availableQuestions = currentRound.questions.filter(
      (q) => !usedQuestionIds.includes(q.id)
    );

    let chosenQ = null;
    if (availableQuestions.length > 0) {
      chosenQ = availableQuestions[0];
    } else {
      const allQuestions = SAMPLE_ROUNDS.flatMap((r) => r.questions);
      const remainingGlobal = allQuestions.filter((q) => !usedQuestionIds.includes(q.id));
      if (remainingGlobal.length > 0) {
        chosenQ = remainingGlobal[0];
      } else {
        chosenQ = currentRound.questions[Math.floor(Math.random() * currentRound.questions.length)];
      }
    }

    setCurrentQuestion(chosenQ);
    setUsedQuestionIds((prev) => [...prev, chosenQ.id]);
    setGameStatus("QUIZ");
  };

  // 2. Xử lý trả lời Quiz ĐÚNG
  const handleQuizCorrect = () => {
    if (pendingSwapTargetId) {
      const targetTeam = teams.find((t) => t.id === pendingSwapTargetId);
      if (targetTeam) {
        const currentScore = currentTeam.score;
        const targetScore = targetTeam.score;
        setTeams((prev) =>
          prev.map((t) => {
            if (t.id === currentTeam.id) return { ...t, score: targetScore };
            if (t.id === targetTeam.id) return { ...t, score: currentScore };
            return t;
          })
        );
        setStatusMessage(`Đổi điểm thành công! ${currentTeam.name} nhận điểm từ ${targetTeam.name}.`);
      }
      setPendingSwapTargetId(null);
    }

    setGameStatus("GUESSING");
  };

  // 3. Xử lý trả lời Quiz SAI
  const handleQuizWrong = () => {
    setPendingPoints(0);
    setPendingSwapTargetId(null);
    setStatusMessage(`Rất tiếc! Trả lời chưa chính xác. Điểm lượt quay bị hủy và chuyển lượt.`);
    advanceToNextTeam();
  };

  // 4. Xác nhận Swap đội
  const handleConfirmSwap = (targetTeamId) => {
    setPendingSwapTargetId(targetTeamId);
    setStatusMessage(`${currentTeam.name} đã chọn đổi điểm! Trả lời đúng câu hỏi để hoàn tất.`);
    setGameStatus("SPINNING");
    setTimeout(() => {
      openNextQuiz();
    }, 1000);
  };

  // 5. Xử lý đoán chữ cái -> Đoán xong chuyển sang đội tiếp theo
  const handleGuessLetter = (char) => {
    setGameStatus("RESOLVING");
    const baseChar = getBaseVietnameseLetter(char);
    setUsedLetters((prev) => [...prev, char]);

    if (uniqueBaseLettersInKeyword.includes(baseChar)) {
      sound.playCorrect();

      const awardedPoints = pendingPoints;
      setTeams((prev) =>
        prev.map((t, idx) =>
          idx === currentTeamIdx ? { ...t, score: t.score + awardedPoints } : t
        )
      );

      const updatedRevealed = [...revealedLetters, baseChar];
      setRevealedLetters(updatedRevealed);

      const count = currentRound.displayKeyword
        .replace(/\s+/g, "")
        .split("")
        .map(getBaseVietnameseLetter)
        .filter((c) => c === baseChar).length;

      setStatusMessage(
        `Chính xác! Chữ '${char}' có ${count} vị trí. ${currentTeam.name} +${awardedPoints} điểm!`
      );

      const isAllRevealed = uniqueBaseLettersInKeyword.every((c) =>
        updatedRevealed.includes(c)
      );

      if (isAllRevealed) {
        setTimeout(() => {
          triggerVictory(currentTeam, `Đã mở toàn bộ các chữ cái trong từ khóa!`);
        }, 1200);
      } else {
        setTimeout(() => {
          advanceToNextTeam();
        }, 2000);
      }
    } else {
      sound.playWrong();
      setPendingPoints(0);
      setStatusMessage(`Rất tiếc! Chữ '${char}' không có trong từ khóa. Chuyển lượt sang đội kế tiếp.`);
      setTimeout(() => {
        advanceToNextTeam();
      }, 2000);
    }
  };

  // 6. Xử lý đoán trực tiếp toàn bộ từ khóa
  const handleGuessKeyword = (guessStr) => {
    setGameStatus("RESOLVING");
    const updatedWithFlag = teams.map((t, idx) =>
      idx === currentTeamIdx ? { ...t, hasGuessedKeyword: true } : t
    );

    const normGuess = normalizeForKeywordComparison(guessStr);
    const normActual = normalizeForKeywordComparison(currentRound.displayKeyword);

    if (normGuess === normActual) {
      sound.playVictory();
      const winningBonus = 1000 + pendingPoints;
      const finalTeams = updatedWithFlag.map((t, idx) =>
        idx === currentTeamIdx ? { ...t, score: t.score + winningBonus } : t
      );
      setTeams(finalTeams);

      setRevealedLetters(uniqueBaseLettersInKeyword);

      triggerVictory(
        finalTeams[currentTeamIdx],
        `Đã giải mã xuất sắc từ khóa: "${currentRound.displayKeyword}"!`
      );
    } else {
      sound.playWrong();
      setPendingPoints(0);

      const updatedEliminated = updatedWithFlag.map((t, idx) =>
        idx === currentTeamIdx ? { ...t, isEliminated: true } : t
      );
      setTeams(updatedEliminated);
      setStatusMessage(`ĐOÁN SAI TỪ KHÓA! ${currentTeam.name} đã bị LOẠI khỏi vòng chơi này.`);

      setTimeout(() => {
        advanceToNextTeam(updatedEliminated);
      }, 2200);
    }
  };

  // Kích hoạt vinh danh chiến thắng
  const triggerVictory = (winner, reason) => {
    setWinnerInfo({ winner, reason });
    setGameStatus("ROUND_WON");
  };

  // Chuyển sang vòng tiếp theo
  const handleNextRound = () => {
    const nextRoundIdx = (currentRoundIdx + 1) % SAMPLE_ROUNDS.length;
    setCurrentRoundIdx(nextRoundIdx);
    setRevealedLetters([]);
    setUsedLetters([]);
    setWinnerInfo(null);
    setGameStatus("IDLE");
    setCurrentSlice(null);
    setPendingPoints(0);
    setPendingSwapTargetId(null);

    const resetTeams = teams.map((t) => ({
      ...t,
      isEliminated: false,
      hasGuessedKeyword: false,
    }));
    setTeams(resetTeams);
    setStatusMessage(`Bắt đầu Vòng ${nextRoundIdx + 1}: ${SAMPLE_ROUNDS[nextRoundIdx].topic}!`);
  };

  // Mở lại vòng hiện tại khi tất cả các đội đều bị loại
  const handleRetryCurrentRound = () => {
    setRevealedLetters([]);
    setUsedLetters([]);
    setGameStatus("IDLE");
    setCurrentSlice(null);
    setPendingPoints(0);
    setPendingSwapTargetId(null);

    const resetTeams = teams.map((t) => ({
      ...t,
      isEliminated: false,
      hasGuessedKeyword: false,
    }));
    setTeams(resetTeams);
    setCurrentTeamIdx(0);
    setStatusMessage(`Vòng chơi đã được mở lại. Mời ${resetTeams[0].name} quay vòng quay!`);
  };

  // Khởi động lại toàn bộ game
  const handleResetGame = () => {
    const resetTeams = teams.map((t) => ({
      ...t,
      score: 0,
      isEliminated: false,
      hasGuessedKeyword: false,
    }));
    setTeams(resetTeams);
    setCurrentRoundIdx(0);
    setRevealedLetters([]);
    setUsedLetters([]);
    setUsedQuestionIds([]);
    setCurrentTeamIdx(0);
    setWinnerInfo(null);
    setGameStatus("IDLE");
    setCurrentSlice(null);
    setPendingPoints(0);
    setPendingSwapTargetId(null);
    setStatusMessage("Trò chơi đã được đặt lại từ đầu. Chúc các đội may mắn!");
  };

  // Bật/tắt chế độ toàn màn hình cho trình chiếu máy chiếu
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Mở trực tiếp hộp thoại đoán từ khóa cho đội đang chơi
  const handleOpenDirectKeywordGuess = () => {
    if (!["IDLE", "GUESSING"].includes(gameStatus) || currentTeam.isEliminated || currentTeam.hasGuessedKeyword) return;
    setKeywordReturnStatus(gameStatus);
    if (gameStatus === "IDLE") setPendingPoints(0);
    setGameStatus("DIRECT_GUESS");
  };

  // Nhấp trực tiếp chữ cái trên bảng chữ cái A-Z (khi đang ở lượt đoán)
  const handleDirectLetterClick = (char) => {
    if (gameStatus === "GUESSING" && !usedLetters.includes(char)) {
      setLetterInput("");
      handleGuessLetter(char);
    }
  };

  const handleSaveSetup = (updatedTeams, round) => {
    setTeams(updatedTeams.map((team, index) => ({ ...team, name: team.name.trim() || `Đội ${index + 1}`, isEliminated: false, hasGuessedKeyword: false })));
    setCurrentRoundIdx(SAMPLE_ROUNDS.findIndex(item => item.id === round.id));
    setCurrentTeamIdx(0);
    setRevealedLetters([]);
    setUsedLetters([]);
    setUsedQuestionIds([]);
    setCurrentSlice(null);
    setPendingPoints(0);
    setPendingSwapTargetId(null);
    setGameStatus("IDLE");
    setStatusMessage("Đã cập nhật trò chơi. Mời đội đầu tiên quay vòng quay.");
  };

  return (
    <div className="game-shell">
      <header className="masthead">
        <div className="course-brand"><span className="brand-mark" aria-hidden="true">★</span><div><span className="eyebrow">HCM202 · IB1804</span><h1>Tư tưởng Hồ Chí Minh</h1></div></div>
        <div className="header-actions"><button className="button secondary" onClick={toggleFullScreen}>Toàn màn hình</button><button className="button secondary" disabled={gameStatus !== "IDLE"} onClick={() => setIsSetupOpen(true)}>Cấu hình</button></div>
      </header>
      <div className="page-heading"><div><p className="eyebrow">Hoạt động ôn tập</p><h2>Chiếc nón kỳ diệu</h2></div><span className="round-counter">Vòng <strong>{String(currentRoundIdx + 1).padStart(2, '0')}</strong><span>/ {String(SAMPLE_ROUNDS.length).padStart(2, '0')}</span></span></div>
      <main className="game-layout">
        <aside className="score-region"><ScoreBoard teams={teams} currentTeamIndex={currentTeamIdx} /></aside>
        <div className="play-region">
          <Board topic={currentRound.topic} displayKeyword={currentRound.displayKeyword} revealedLetters={revealedLetters} hint={currentRound.hint} />
          <div className="controls-layout">
            <section className="wheel-panel">
              <div className="panel-heading"><div><span className="eyebrow">Lượt hiện tại</span><h3>{currentTeam.name}</h3></div><span className="slice-result">{currentSlice ? currentSlice.label : "Sẵn sàng"}</span></div>
              <Wheel slices={WHEEL_SLICES} onSpinStart={() => { setGameStatus("SPINNING"); setStatusMessage(`${currentTeam.name} đang quay vòng quay…`); }} onSpinEnd={handleSpinEnd} isSpinning={gameStatus === "SPINNING"} disabled={gameStatus !== "IDLE"} solveDisabled={!["IDLE", "GUESSING"].includes(gameStatus) || currentTeam.hasGuessedKeyword || currentTeam.isEliminated} onSolveKeyword={handleOpenDirectKeywordGuess} />
            </section>
            <section className="alphabet-panel">
              <div className="panel-heading"><h3>Bảng chữ cái</h3><span className="muted">{usedLetters.length}/26</span></div>
              <p className="supporting">{gameStatus === "GUESSING" ? "Chọn một chữ cái bên dưới hoặc nhấn Giải từ khóa." : "Trả lời đúng câu hỏi để chọn một chữ cái."}</p>
              {gameStatus === "GUESSING" && <form className="letter-entry" onSubmit={event => { event.preventDefault(); if (letterInput && !usedLetters.includes(letterInput)) handleDirectLetterClick(letterInput); }}>
                <label htmlFor="letter-input">Nhập ký tự</label>
                <input id="letter-input" autoComplete="off" maxLength={1} value={letterInput} onChange={event => setLetterInput(getBaseVietnameseLetter(event.target.value).replace(/[^A-Z]/g, "").slice(0, 1))} autoFocus />
                <button className="button primary" disabled={!letterInput || usedLetters.includes(letterInput)}>Chọn chữ</button>
              </form>}
              <div className="alphabet-grid">{ALPHABET_A_Z.map(char => <button key={char} className={`letter-key ${usedLetters.includes(char) ? revealedLetters.includes(char) ? 'found' : 'missed' : ''}`} disabled={usedLetters.includes(char) || gameStatus !== "GUESSING"} onClick={() => handleDirectLetterClick(char)}>{char}</button>)}</div>
              <div className="progress-label"><span>Ô chữ đã mở</span><strong>{revealedCount} / {totalLetterCount}</strong></div>
              <progress value={revealedCount} max={totalLetterCount} aria-label="Tiến độ mở ô chữ" />
            </section>
          </div>
        </div>
      </main>
      {/* 3. CÁC MODAL ĐIỀU KHIỂN & TƯƠNG TÁC */}
      {gameStatus === "QUIZ" && currentQuestion && (
        <QuizModal
          question={currentQuestion}
          currentTeamName={currentTeam.name}
          onCorrect={handleQuizCorrect}
          onWrong={handleQuizWrong}
        />
      )}

      {gameStatus === "DIRECT_GUESS" && (
        <GuessModal
          onCancel={() => setGameStatus(keywordReturnStatus)}
          currentTeam={currentTeam}
          onGuessKeyword={handleGuessKeyword}
        />
      )}

      {gameStatus === "SWAP_SELECT" && (
        <SwapModal
          currentTeam={currentTeam}
          otherTeams={teams.filter((t, idx) => idx !== currentTeamIdx && !t.isEliminated)}
          onConfirmSwap={handleConfirmSwap}
        />
      )}

      {gameStatus === "ROUND_WON" && winnerInfo && (
        <VictoryModal
          winnerTeam={winnerInfo.winner}
          reason={winnerInfo.reason}
          onNextRound={handleNextRound}
          onResetGame={handleResetGame}
        />
      )}

      {gameStatus === "ALL_ELIMINATED" && (
        <AllEliminatedModal
          keyword={currentRound.displayKeyword}
          onNextRound={handleNextRound}
          onRetryRound={handleRetryCurrentRound}
        />
      )}

      {isSetupOpen && (
        <SetupModal
          teams={teams}
          currentRound={currentRound}
          onSaveSetup={handleSaveSetup}
          onClose={() => setIsSetupOpen(false)}
        />
      )}
    </div>
  );
}
