// CONCEPTS: props, onClick event, conditional class name.
// The parent decides which mood is selected (isSelected) and what happens on click (onSelect).
function MoodCard({ mood, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={isSelected ? 'cv-mood selected' : 'cv-mood'}
      style={{ '--mood-color': mood.color }}
      onClick={() => onSelect(mood.id)}
      aria-pressed={isSelected}
    >
      <span className="cv-mood-emoji">{mood.emoji}</span>
      <span className="cv-mood-label">{mood.label}</span>
      {isSelected && <span className="cv-mood-tick">✔ Selected</span>}
    </button>
  );
}

export default MoodCard;
