// DATA: the original "demo" state. "Reset Demo Data" puts the app back to exactly this.
// Dates are fixed strings so the sample data looks the same every time.
export const sampleCheckins = [
  { id: 1, moodId: 'happy', note: '', date: '2026-01-12T09:00:00.000Z' },
  { id: 2, moodId: 'motivated', note: 'Ready to learn React!', date: '2026-01-12T09:02:00.000Z' },
  { id: 3, moodId: 'curious', note: '', date: '2026-01-12T09:04:00.000Z' },
  { id: 4, moodId: 'motivated', note: '', date: '2026-01-12T09:05:00.000Z' },
  { id: 5, moodId: 'tired', note: 'Long bus ride this morning', date: '2026-01-12T09:07:00.000Z' },
  { id: 6, moodId: 'excited', note: '', date: '2026-01-12T09:09:00.000Z' },
  { id: 7, moodId: 'motivated', note: '', date: '2026-01-12T09:10:00.000Z' },
];

export const sampleVotes = { game: 3, movie: 2, music: 4, quiz: 1 };

export const sampleSuggestions = [
  {
    id: 1,
    name: 'Amara',
    title: 'Weekly show-and-tell',
    description: 'Every Friday, one student shows a small project they built during the week.',
    date: '2026-01-10T10:00:00.000Z',
  },
  {
    id: 2,
    name: 'Tunde',
    title: 'Pair programming sessions',
    description: 'Let us code in pairs for the practical exercises so we can help each other.',
    date: '2026-01-11T14:30:00.000Z',
  },
];

export const sampleCompleted = [1];
