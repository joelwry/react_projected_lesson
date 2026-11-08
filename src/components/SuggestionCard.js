// CONCEPTS: props, conditional rendering (the delete button only shows if onDelete is given).
function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function SuggestionCard({ suggestion, onDelete }) {
  return (
    <div className="cv-card cv-suggestion h-100">
      <div className="d-flex justify-content-between align-items-start gap-2">
        <h3 className="h6 fw-bold mb-1">💡 {suggestion.title}</h3>
        {onDelete && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(suggestion.id)}
            aria-label={'Delete suggestion ' + suggestion.title}
          >
            <i className="bi bi-trash"></i>
          </button>
        )}
      </div>
      <p className="text-muted mb-3">{suggestion.description}</p>
      <div className="small cv-suggestion-meta">
        <span>
          <i className="bi bi-person-circle me-1"></i>
          {suggestion.name}
        </span>
        <span>
          <i className="bi bi-calendar3 me-1"></i>
          {formatDate(suggestion.date)}
        </span>
      </div>
    </div>
  );
}

export default SuggestionCard;
