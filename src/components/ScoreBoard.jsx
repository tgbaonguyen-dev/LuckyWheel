export default function ScoreBoard({ teams, currentTeamIndex }) {
  return <section className="scoreboard"><div className="panel-heading"><h2>Bảng điểm</h2><span className="muted">{teams.length} đội</span></div>
    <div className="team-list">{teams.map((team, index) => <article key={team.id} className={`team-row ${index === currentTeamIndex && !team.isEliminated ? 'active' : ''} ${team.isEliminated ? 'eliminated' : ''}`}>
      <span className="team-emblem" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div className="team-info"><span className="team-number">ĐỘI {String(index + 1).padStart(2, '0')}</span><h3 title={team.name}>{team.name}</h3><span className="team-state">{team.isEliminated ? 'Dừng vòng chơi' : index === currentTeamIndex ? 'Đang chơi' : 'Chờ lượt'}</span></div>
      <div className="team-score"><strong>{team.score.toLocaleString('vi-VN')}</strong><span>điểm</span></div>
    </article>)}</div><div className="score-note">Điểm được cộng dồn qua các vòng chơi.</div>
  </section>;
}
