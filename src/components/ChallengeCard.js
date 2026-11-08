// CONCEPTS: props, onClick, conditional rendering based on a true/false prop.
function ChallengeCard({ challenge, isCompleted, onToggle }) {
  return (
    <div className={isCompleted ? 'cv-card cv-challenge done h-100' : 'cv-card cv-challenge h-100'}>
      <div className="d-flex justify-content-between align-items-start">
        <div className="cv-challenge-emoji">{challenge.emoji}</div>
        <span className="badge cv-badge-points">+{challenge.points} pts</span>
      </div>
      <h3 className="h6 fw-bold mt-3">{challenge.title}</h3>
      <p className="text-muted">{challenge.description}</p>
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <span className={isCompleted ? 'cv-status done' : 'cv-status'}>
          {isCompleted ? '✅ Completed' : '⏳ Not yet done'}
        </span>
        <button
          type="button"
          className={isCompleted ? 'btn btn-sm btn-outline-secondary' : 'btn btn-sm cv-btn-primary'}
          onClick={() => onToggle(challenge.id)}
        >
          {isCompleted ? 'Undo' : 'Mark as done'}
        </button>
      </div>
    </div>
  );
}

export default ChallengeCard;
