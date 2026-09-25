import { getBaseVietnameseLetter } from "../data/gameData";
export default function Board({ topic, displayKeyword, revealedLetters, hint }) {
  const words = displayKeyword.split(" ");
  return <section className="keyword-panel" aria-label="Ô chữ của vòng chơi">
    <div className="keyword-heading"><span className="eyebrow">Giải mã từ khóa</span><span className="muted">{words.length} từ · {displayKeyword.replace(/\s+/g, "").length} chữ cái</span></div>
    <h3>{topic.replace(/^Chủ đề \d+:\s*/, "")}</h3>
    {hint && <p className="keyword-hint">{hint}</p>}
    <div className="keyword-grid">{words.map((word, i) => <div className="keyword-word" key={i}>{word.split("").map((char, j) => {
      const revealed = revealedLetters.includes(getBaseVietnameseLetter(char));
      return <span key={j} className={`keyword-tile ${revealed ? 'revealed' : ''}`} aria-label={revealed ? char : 'Chữ chưa mở'}>{revealed ? char : <span aria-hidden="true">·</span>}</span>;
    })}</div>)}</div>
  </section>;
}
