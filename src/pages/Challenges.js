import PageHeader from '../components/PageHeader';
import ChallengeCard from '../components/ChallengeCard';
import { CHALLENGES } from '../data/challenges';

// CONCEPTS: props, .map() with keys, derived values, progress indicator.
function Challenges({ completed, onToggle, onResetChallenges }) {
  const total = CHALLENGES.length;
  const done = completed.length;
  const percent = Math.round((done / total) * 100);
  const points = CHALLENGES.filter((c) => completed.includes(c.id)).reduce((sum, c) => sum + c.points, 0);

  return (
    <>
      <PageHeader emoji="🏆" title="Fun Challenges" subtitle="Complete the challenges and collect points." />

      <div className="cv-card mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
          <h3 className="h5 fw-bold mb-0">
            {done} of {total} completed · {points} points
          </h3>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              if (window.confirm('Reset all challenges to "not done"?')) onResetChallenges();
            }}
          >
            Reset challenges
          </button>
        </div>
        <div className="cv-progress">
          <div className="cv-progress-bar" style={{ width: percent + '%' }}></div>
        </div>
        <div className="small text-muted mt-1">
          {percent === 100 ? '🎊 All challenges complete - amazing work!' : percent + '% complete'}
        </div>
      </div>

      <div className="row g-3">
        {CHALLENGES.map((challenge) => (
          <div className="col-12 col-md-6 col-xl-4" key={challenge.id}>
            <ChallengeCard
              challenge={challenge}
              isCompleted={completed.includes(challenge.id)}
              onToggle={onToggle}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Challenges;
