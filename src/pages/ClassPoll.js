import PageHeader from '../components/PageHeader';
import PollOption from '../components/PollOption';
import { POLL } from '../data/poll';

// CONCEPTS: props from the parent, derived values, conditional rendering, .map().
function ClassPoll({ votes, myVote, onVote, onNextStudent, onResetPoll }) {
  // Add up all the votes.
  const totalVotes = POLL.options.reduce((sum, option) => sum + votes[option.id], 0);
  // The highest vote count (to find the leading option).
  const highest = Math.max(...POLL.options.map((option) => votes[option.id]));
  const hasVoted = myVote !== null;

  return (
    <>
      <PageHeader emoji="📊" title="Class Poll" subtitle="One vote per browser. Make it count!" />

      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <div className="cv-card">
            <h3 className="h4 fw-bold mb-1">{POLL.question}</h3>
            <p className="text-muted">
              {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} so far
            </p>

            {hasVoted ? (
              <div className="cv-feedback mb-3" role="status">
                🎉 Thanks for voting! You can only vote once on this browser.
              </div>
            ) : (
              <div className="cv-hint mb-3">👇 Choose one option and press Vote.</div>
            )}

            <div className="d-grid gap-3">
              {POLL.options.map((option) => (
                <PollOption
                  key={option.id}
                  option={option}
                  votes={votes[option.id]}
                  totalVotes={totalVotes}
                  isLeading={totalVotes > 0 && votes[option.id] === highest}
                  isMyVote={myVote === option.id}
                  hasVoted={hasVoted}
                  onVote={onVote}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="cv-card">
            <h3 className="h5 fw-bold">👩‍🏫 Instructor controls</h3>
            <p className="text-muted small">
              Projecting the class? Click <strong>Next student</strong> so the next person can vote on the same browser.
            </p>
            <div className="d-grid gap-2">
              <button type="button" className="btn cv-btn-primary" onClick={onNextStudent} disabled={!hasVoted}>
                ➡️ Next student can vote
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  if (window.confirm('Reset the poll? All votes will be set back to 0.')) onResetPoll();
                }}
              >
                Reset poll
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClassPoll;
