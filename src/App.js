import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import MoodCheckin from './pages/MoodCheckin';
import ClassPoll from './pages/ClassPoll';
import Suggestions from './pages/Suggestions';
import Challenges from './pages/Challenges';

import { EMPTY_VOTES } from './data/poll';
import { sampleCheckins, sampleVotes, sampleSuggestions, sampleCompleted } from './data/sampleData';
import { KEYS, loadData, saveData, clearAllData } from './storage';

// App owns ALL the shared data (state) and passes it DOWN to the pages as props.
// Pages send changes back UP by calling the handler functions we give them.
function App() {
  // useState with a function: runs once at start and LOADS saved data from localStorage.
  const [checkins, setCheckins] = useState(() => loadData(KEYS.checkins, sampleCheckins));
  const [votes, setVotes] = useState(() => loadData(KEYS.votes, sampleVotes));
  const [myVote, setMyVote] = useState(() => loadData(KEYS.myVote, null));
  const [suggestions, setSuggestions] = useState(() => loadData(KEYS.suggestions, sampleSuggestions));
  const [completed, setCompleted] = useState(() => loadData(KEYS.completed, sampleCompleted));

  // useEffect: SAVE each piece of data whenever it changes.
  useEffect(() => saveData(KEYS.checkins, checkins), [checkins]);
  useEffect(() => saveData(KEYS.votes, votes), [votes]);
  useEffect(() => saveData(KEYS.myVote, myVote), [myVote]);
  useEffect(() => saveData(KEYS.suggestions, suggestions), [suggestions]);
  useEffect(() => saveData(KEYS.completed, completed), [completed]);

  // ----- Event handlers (they update state) -----
  function addCheckin(moodId, note) {
    const newCheckin = { id: Date.now(), moodId: moodId, note: note, date: new Date().toISOString() };
    setCheckins([...checkins, newCheckin]); // new array = old items + new item
  }

  function vote(optionId) {
    if (myVote !== null) return; // already voted on this browser
    setVotes({ ...votes, [optionId]: votes[optionId] + 1 }); // new object, one value changed
    setMyVote(optionId);
  }

  function nextStudent() {
    setMyVote(null); // keeps the votes, lets the next student vote
  }

  function resetPoll() {
    setVotes(EMPTY_VOTES);
    setMyVote(null);
  }

  function addSuggestion(suggestion) {
    setSuggestions([...suggestions, suggestion]);
  }

  function deleteSuggestion(id) {
    setSuggestions(suggestions.filter((s) => s.id !== id));
  }

  function toggleChallenge(id) {
    if (completed.includes(id)) {
      setCompleted(completed.filter((c) => c !== id));
    } else {
      setCompleted([...completed, id]);
    }
  }

  function resetChallenges() {
    setCompleted([]);
  }

  // Instructor tool: wipe localStorage and go back to the original sample data.
  function resetDemo() {
    clearAllData();
    setCheckins(sampleCheckins);
    setVotes(sampleVotes);
    setMyVote(null);
    setSuggestions(sampleSuggestions);
    setCompleted(sampleCompleted);
  }

  return (
    <div className="cv-app">
      <Sidebar onReset={resetDemo} />
      <div className="cv-main">
        <Navbar />
        <main className="cv-content">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  checkins={checkins}
                  votes={votes}
                  suggestions={suggestions}
                  completed={completed}
                  onToggleChallenge={toggleChallenge}
                  onReset={resetDemo}
                />
              }
            />
            <Route path="/mood" element={<MoodCheckin checkins={checkins} onCheckin={addCheckin} />} />
            <Route
              path="/poll"
              element={
                <ClassPoll
                  votes={votes}
                  myVote={myVote}
                  onVote={vote}
                  onNextStudent={nextStudent}
                  onResetPoll={resetPoll}
                />
              }
            />
            <Route
              path="/suggestions"
              element={<Suggestions suggestions={suggestions} onAdd={addSuggestion} onDelete={deleteSuggestion} />}
            />
            <Route
              path="/challenges"
              element={<Challenges completed={completed} onToggle={toggleChallenge} onResetChallenges={resetChallenges} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
