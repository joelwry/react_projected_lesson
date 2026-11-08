import { useState, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import MoodCard from '../components/MoodCard';
import { MOODS } from '../data/moods';

// CONCEPTS: useState (selected mood), events, useRef (UNCONTROLLED note input),
// conditional rendering, .map() with keys.
function MoodCheckin({ checkins, onCheckin }) {
  const [selectedMoodId, setSelectedMoodId] = useState(null);
  const [message, setMessage] = useState('');

  // UNCONTROLLED input: the browser keeps the text; we only read it when the button is clicked.
  const noteRef = useRef(null);

  function handleCheckin() {
    if (selectedMoodId === null) {
      setMessage('Please pick a mood first 🙂');
      return;
    }
    const mood = MOODS.find((m) => m.id === selectedMoodId);
    onCheckin(selectedMoodId, noteRef.current.value.trim());
    setMessage('✅ Check-in saved! ' + mood.message);
    noteRef.current.value = '';
    setSelectedMoodId(null);
  }

  const recent = checkins.slice(-5).reverse();

  return (
    <>
      <PageHeader emoji="😊" title="Mood Check-in" subtitle="Tap the mood that matches how you feel right now." />

      <div className="row g-4">
        <div className="col-12 col-xl-7">
          <div className="cv-card">
            <h3 className="h5 fw-bold mb-3">How are you feeling?</h3>
            <div className="cv-mood-grid">
              {MOODS.map((mood) => (
                <MoodCard
                  key={mood.id}
                  mood={mood}
                  isSelected={mood.id === selectedMoodId}
                  onSelect={setSelectedMoodId}
                />
              ))}
            </div>

            <label htmlFor="mood-note" className="form-label fw-semibold mt-4">
              Add a short note <span className="text-muted fw-normal">(optional)</span>
            </label>
            <input
              id="mood-note"
              ref={noteRef}
              className="form-control"
              type="text"
              maxLength={80}
              placeholder="e.g. Looking forward to today's lesson"
            />

            <button type="button" className="btn cv-btn-primary mt-3" onClick={handleCheckin}>
              Submit check-in
            </button>

            {message && (
              <div className="cv-feedback mt-3" role="status">
                {message}
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-xl-5">
          <div className="cv-card mb-4">
            <h3 className="h5 fw-bold mb-3">Mood summary</h3>
            {checkins.length === 0 ? (
              <div className="cv-empty">No check-ins yet. Be the first to share your mood!</div>
            ) : (
              MOODS.map((mood) => {
                const count = checkins.filter((c) => c.moodId === mood.id).length;
                const percent = Math.round((count / checkins.length) * 100);
                return (
                  <div key={mood.id} className="cv-summary-row">
                    <span className="cv-summary-emoji">{mood.emoji}</span>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between small">
                        <span>{mood.label}</span>
                        <span className="text-muted">
                          {count} ({percent}%)
                        </span>
                      </div>
                      <div className="cv-progress thin">
                        <div className="cv-progress-bar" style={{ width: percent + '%', background: mood.color }}></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="cv-card">
            <h3 className="h5 fw-bold mb-3">Latest check-ins</h3>
            {recent.length === 0 ? (
              <div className="cv-empty">Nothing here yet.</div>
            ) : (
              <ul className="list-unstyled mb-0">
                {recent.map((checkin) => {
                  const mood = MOODS.find((m) => m.id === checkin.moodId);
                  return (
                    <li key={checkin.id} className="cv-recent-item">
                      <span className="fs-4">{mood.emoji}</span>
                      <span>
                        <strong>{mood.label}</strong>
                        {checkin.note && <span className="text-muted"> - {checkin.note}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MoodCheckin;
