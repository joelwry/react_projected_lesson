# React Concept Mapping

Maps each topic of the React scheme of work to where it appears in ClassVibe.

| Week | Topic | Module | File(s) | Concept demonstrated | Classroom exercise |
|---|---|---|---|---|---|
| 1 | What React is, Virtual DOM | All | `src/index.js`, `public/index.html` | React renders `<App />` into `#root` | Explain the flow from `index.html` to `App` |
| 1 | JSX, expressions | Navbar / Dashboard | `components/Navbar.js` | `{today}`, `className`, expressions in JSX | Show a greeting depending on the time of day |
| 1 | Conditional rendering | Dashboard | `pages/Dashboard.js` | `popularMood ? … : 'No data yet'`, `&&` | Hide the welcome banner when a variable is false |
| 1 | CRA, folder structure, dev server | Project | `package.json`, `src/`, `public/` | `npm start`, `npm run build` | Label each folder of the project |
| 2 | Functional components, reuse | Dashboard | `components/StatCard.js` | One component, six instances | Build a `ChallengeCard` and render three |
| 2 | Props | Mood, Poll, Challenges | `MoodCard.js`, `PollOption.js`, `ChallengeCard.js` | Data flows parent → child (`mood`, `option`, `challenge`) | Add a new mood in `moods.js` and see a new card |
| 2 | Import/export, composition | All pages | `pages/*.js`, `App.js` | Default vs named exports; pages composed of components | Create a new `Badge` component and use it |
| 2 | Basic styling | All | `index.css`, `App.css` | CSS variables, class names, Bootstrap grid | Change `--cv-indigo` and watch the theme change |
| 3 | onClick | Mood, Poll, Challenges | `MoodCard.js`, `PollOption.js`, `ChallengeCard.js` | `onClick={() => onSelect(mood.id)}` | Add a "Clear selection" button |
| 3 | onChange / onSubmit | Suggestions | `pages/Suggestions.js` | `handleChange`, `handleSubmit`, `preventDefault` | Add a character counter |
| 3 | Intro to useState | Mood, Poll | `pages/MoodCheckin.js`, `App.js` | `selectedMoodId`, `votes` | Build a counter with + / − / reset |
| 4 | Arrays, `map`, `filter`, `find`, `reduce` | Poll, Challenges | `ClassPoll.js`, `Challenges.js` | Totals with `reduce`, completed with `includes` | Show only 20-point challenges using `filter` |
| 4 | Keys | Lists everywhere | `Challenges.js`, `Sidebar.js`, `Suggestions.js` | `key={challenge.id}` | Remove a key and read the warning |
| 4 | Fragments | All pages | every `pages/*.js` | `<>…</>` root element | Replace a wrapper `<div>` with a Fragment |
| 4 | Dynamic rendering, empty states | Suggestions, Dashboard | `Suggestions.js`, `Dashboard.js` | `length === 0 ? empty : list` | Add an empty state to the mood history |
| 5 | State updates: arrays & objects | Suggestions, Poll, Challenges | `App.js` | `[...list, item]`, `filter`, `{...votes, [id]: n}` | Add "Clear all suggestions" |
| 5 | Controlled forms | Suggestions | `Suggestions.js` | `value` + `onChange` for 3 fields in one object | Add a category `<select>` |
| 5 | Uncontrolled input | Mood check-in | `MoodCheckin.js` | Note read via `noteRef.current.value` | Compare with a controlled version |
| 5 | Validation | Suggestions | `Suggestions.js` (`validate`) | Errors object, `is-invalid`, friendly messages | Require names of at least 2 letters |
| 5 | Lifting state up | All | `App.js` | State in parent, handlers passed as props | Trace how a vote reaches the Dashboard |
| 6 | useRef – focus | Suggestions | `Suggestions.js` | `titleInputRef.current.focus()` | Focus the first Vote button on the poll page |
| 6 | useEffect – side effects, dependency arrays | All | `App.js`, `PageHeader.js`, `Suggestions.js` | `[]`, `[value]` arrays | Log a message once with `[]` |
| 6 | localStorage | All data | `storage.js`, `App.js` | `loadData` in `useState(() => …)`; save in effects | Find saved data in DevTools |
| 6 | document.title | All pages | `PageHeader.js`, `Suggestions.js` | Tab title follows page and count | Show vote count in the poll tab title |
| 7 | Navigation / React Router | All | `index.js`, `App.js` | `BrowserRouter`, `Routes`, `Route`, `Navigate` | Add an `/about` page |
| 7 | Link / NavLink | Sidebar | `components/Sidebar.js` | `NavLink` with `isActive`, `end` | Replace an `<a>` with `Link` |
| 7 | useLocation | Navbar | `components/Navbar.js` | Page title from current URL | Show the path next to the title |
| 7 | Production build, deployment | Project | `npm run build`, `public/_redirects` | `build/` folder, SPA redirects | Deploy to Netlify or Vercel |
