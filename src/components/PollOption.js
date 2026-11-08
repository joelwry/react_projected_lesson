// CONCEPTS: props, events, conditional rendering, a percentage progress bar.
function PollOption({ option, votes, totalVotes, isLeading, isMyVote, hasVoted, onVote }) {
  // Work out the percentage. Avoid dividing by zero when nobody has voted.
  const percent = totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);

  let className = 'cv-poll-option';
  if (isLeading) className += ' leading';
  if (isMyVote) className += ' mine';

  return (
    <div className={className}>
      <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
        <div className="cv-poll-label">
          <span className="fs-4 me-2">{option.emoji}</span>
          {option.label}
          {isLeading && <span className="badge cv-badge-lead ms-2">👑 Leading</span>}
          {isMyVote && <span className="badge cv-badge-mine ms-2">Your vote</span>}
        </div>
        <button
          type="button"
          className="btn btn-sm cv-btn-primary"
          onClick={() => onVote(option.id)}
          disabled={hasVoted}
        >
          Vote
        </button>
      </div>

      <div className="cv-progress mt-3">
        <div className="cv-progress-bar" style={{ width: percent + '%' }}></div>
      </div>
      <div className="d-flex justify-content-between small text-muted mt-1">
        <span>
          {votes} {votes === 1 ? 'vote' : 'votes'}
        </span>
        <strong>{percent}%</strong>
      </div>
    </div>
  );
}

export default PollOption;
