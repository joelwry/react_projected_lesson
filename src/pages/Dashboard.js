import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import SuggestionCard from '../components/SuggestionCard';
import ChallengeCard from '../components/ChallengeCard';
import ResetButton from '../components/ResetButton';
import { MOODS } from '../data/moods';
import { POLL } from '../data/poll';
import { CHALLENGES } from '../data/challenges';

// CONCEPTS: composition (many small components), props, JSX expressions,
// conditional rendering (empty states). Every number is CALCULATED from the data.
function Dashboard({ checkins, votes, suggestions, completed, onToggleChallenge, onReset }) {
  const totalVotes = POLL.options.reduce((sum, option) => sum + votes[option.id], 0);

  // Most popular mood: count each mood and pick the biggest count.
  let popularMood = null;
  let popularMoodCount = 0;
  MOODS.forEach((mood) => {
    const count = checkins.filter((c) => c.moodId === mood.id).length;
    if (count > popularMoodCount) {
      popularMood = mood;
      popularMoodCount = count;
    }
  });

  // Most popular poll option.
  let popularOption = null;
  POLL.options.forEach((option) => {
    if (votes[option.id] > 0 && (popularOption === null || votes[option.id] > votes[popularOption.id])) {
      popularOption = option;
    }
  });

  // The most recent check-in is the "current mood".
  const latestCheckin = checkins.length > 0 ? checkins[checkins.length - 1] : null;
  const currentMood = latestCheckin ? MOODS.find((m) => m.id === latestCheckin.moodId) : null;

  const recentSuggestions = [...suggestions].reverse().slice(0, 2);

  // Daily challenge: a different one each day of the year.
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const dailyChallenge = CHALLENGES[dayOfYear % CHALLENGES.length];

  return (
    <>
      <PageHeader emoji="🏠" title="Home" subtitle="Everything happening in our class, in one place." />

      <div className="cv-welcome mb-4">
        <div>
          <h2 className="h3 fw-bold mb-1">Welcome to ClassVibe! 🎉</h2>
          <p className="mb-3">Check in with your mood, vote in the poll, share ideas and complete challenges.</p>
          <Link to="/mood" className="btn btn-light fw-semibold">Start with your mood →</Link>
        </div>
        <div className="cv-welcome-emoji" aria-hidden="true">🚀</div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-4">
          <StatCard icon="😊" label="Mood check-ins" value={checkins.length} color="linear-gradient(135deg,#f59e0b,#fbbf24)" />
        </div>
        <div className="col-6 col-xl-4">
          <StatCard icon="💡" label="Suggestions" value={suggestions.length} color="linear-gradient(135deg,#7c3aed,#a78bfa)" />
        </div>
        <div className="col-6 col-xl-4">
          <StatCard icon="🗳️" label="Total votes" value={totalVotes} color="linear-gradient(135deg,#4f46e5,#818cf8)" />
        </div>
        <div className="col-6 col-xl-4">
          <StatCard icon="🏆" label="Challenges completed" value={completed.length + ' / ' + CHALLENGES.length} color="linear-gradient(135deg,#10b981,#34d399)" />
        </div>
        <div className="col-6 col-xl-4">
          <StatCard
            icon={popularMood ? popularMood.emoji : '❓'}
            label="Most popular mood"
            value={popularMood ? popularMood.label : 'No data yet'}
            color="linear-gradient(135deg,#ec4899,#f472b6)"
          />
        </div>
        <div className="col-6 col-xl-4">
          <StatCard
            icon={popularOption ? popularOption.emoji : '❓'}
            label="Top poll option"
            value={popularOption ? popularOption.label : 'No votes yet'}
            color="linear-gradient(135deg,#0ea5e9,#38bdf8)"
          />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="cv-card h-100">
            <h3 className="h5 fw-bold mb-3">Current mood</h3>
            {currentMood ? (
              <div className="cv-current-mood">
                <div className="cv-current-emoji">{currentMood.emoji}</div>
                <div>
                  <div className="fw-bold fs-5">{currentMood.label}</div>
                  <div className="text-muted small">{currentMood.message}</div>
                </div>
              </div>
            ) : (
              <div className="cv-empty">No mood checked in yet.</div>
            )}
            <Link to="/mood" className="btn btn-sm btn-outline-primary mt-3">Check in</Link>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="cv-card h-100">
            <h3 className="h5 fw-bold mb-1">Active poll</h3>
            <p className="text-muted small">{POLL.question}</p>
            {totalVotes === 0 ? (
              <div className="cv-empty">No votes yet. Be the first!</div>
            ) : (
              POLL.options.map((option) => {
                const percent = Math.round((votes[option.id] / totalVotes) * 100);
                return (
                  <div key={option.id} className="mb-2">
                    <div className="d-flex justify-content-between small">
                      <span>{option.emoji} {option.label}</span>
                      <span className="text-muted">{percent}%</span>
                    </div>
                    <div className="cv-progress thin">
                      <div className="cv-progress-bar" style={{ width: percent + '%' }}></div>
                    </div>
                  </div>
                );
              })
            )}
            <Link to="/poll" className="btn btn-sm btn-outline-primary mt-2">Go to poll</Link>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <h3 className="h5 fw-bold mb-3">Recent suggestions</h3>
          {recentSuggestions.length === 0 ? (
            <div className="cv-card cv-empty">No suggestions yet. <Link to="/suggestions">Add one!</Link></div>
          ) : (
            <div className="row g-3">
              {recentSuggestions.map((suggestion) => (
                <div className="col-12 col-md-6" key={suggestion.id}>
                  <SuggestionCard suggestion={suggestion} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-12 col-lg-5">
          <h3 className="h5 fw-bold mb-3">Today's challenge</h3>
          <ChallengeCard
            challenge={dailyChallenge}
            isCompleted={completed.includes(dailyChallenge.id)}
            onToggle={onToggleChallenge}
          />
        </div>
      </div>

      <div className="cv-card mt-4 d-lg-none">
        <div className="small fw-semibold mb-2">👩‍🏫 Instructor tools</div>
        <ResetButton onReset={onReset} />
      </div>
    </>
  );
}

export default Dashboard;
