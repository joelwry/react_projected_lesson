// DATA: the class poll. The question and its options live here, not inside the component.
export const POLL = {
  question: 'What should we do during our next class break?',
  options: [
    { id: 'game', label: 'Play a quick game', emoji: '🎮' },
    { id: 'movie', label: 'Watch a short movie', emoji: '🎬' },
    { id: 'music', label: 'Listen to music', emoji: '🎧' },
    { id: 'quiz', label: 'Have a tech quiz', emoji: '🧠' },
  ],
};

// A votes object with every option set to 0, e.g. { game: 0, movie: 0, ... }
export const EMPTY_VOTES = {
  game: 0,
  movie: 0,
  music: 0,
  quiz: 0,
};
