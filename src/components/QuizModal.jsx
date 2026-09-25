import { useState, useEffect, useRef } from "react";
import { sound } from "../utils/audio";

const ANSWER_SECONDS = 20;

export default function QuizModal({ question, onCorrect, onWrong, currentTeamName }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [timeLeft, setTimeLeft] = useState(ANSWER_SECONDS);
  const [deadline] = useState(() => Date.now() + ANSWER_SECONDS * 1000);
  const closed = useRef(false);
  const isAnswered = selectedIdx !== null || timeLeft === 0;
  const isCorrect = selectedIdx === question.correct;

  useEffect(() => {
    if (isAnswered) return;
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining === 0) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [deadline, isAnswered]);

  const handleSelect = (index) => {
    if (isAnswered) return;
    // Read the clock on the answer click to reject submissions after the deadline.
    // eslint-disable-next-line react/purity
    if (Date.now() >= deadline) {
      setTimeLeft(0);
      return;
    }
    setSelectedIdx(index);
    if (index === question.correct) sound.playCorrect();
    else sound.playWrong();
  };

  const handleClose = () => {
    if (closed.current) return;
    closed.current = true;
    if (isCorrect) onCorrect();
    else onWrong();
  };

  return <div role="dialog" aria-modal="true" aria-labelledby="quiz-question" className="modal-overlay fixed inset-0 z-50 flex items-center justify-center">
    <div className="quiz-dialog relative w-full">
      <div className="quiz-header">
        <div><span className="eyebrow">Câu hỏi trắc nghiệm</span><p>Lượt trả lời của <strong>{currentTeamName}</strong></p></div>
        <span className={`quiz-timer ${timeLeft <= 5 ? 'urgent' : ''}`} aria-label={`Còn ${timeLeft} giây`}>{timeLeft}<small>giây</small></span>
      </div>
      <h3 id="quiz-question">{question.question}</h3>
      <div className="quiz-answers">{question.answers.map((answer, index) => {
        const state = isAnswered ? index === question.correct ? 'correct' : index === selectedIdx ? 'incorrect' : 'inactive' : '';
        return <button key={index} className={`quiz-answer ${state}`} onClick={() => handleSelect(index)} disabled={isAnswered}><span className="answer-index">{String.fromCharCode(65 + index)}</span><span>{answer}</span></button>;
      })}</div>
      {isAnswered && <div className="quiz-explanation" role="status"><strong>{isCorrect ? "Chính xác!" : selectedIdx === null ? "Hết thời gian trả lời." : "Câu trả lời chưa chính xác."}</strong><p>{question.explanation}</p></div>}
      <div className="quiz-footer"><span>{isAnswered ? isCorrect ? "Đóng câu hỏi để chọn chữ cái hoặc giải từ khóa." : "Đóng câu hỏi để chuyển sang đội tiếp theo." : "Đóng trước khi trả lời sẽ bỏ lượt của đội."}</span><button className="button primary" onClick={handleClose}>{isAnswered ? "Đóng câu hỏi" : "Đóng và bỏ lượt"}</button></div>
    </div>
  </div>;
}
