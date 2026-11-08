import { useLocation } from 'react-router-dom';
import { PAGES } from '../data/pages';

// CONCEPTS: useLocation (which page are we on?), JSX expressions {}.
function Navbar() {
  const location = useLocation();
  const currentPage = PAGES.find((page) => page.path === location.pathname) || PAGES[0];

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="cv-topbar">
      <div className="cv-topbar-left">
        <div className="cv-mobile-logo">🎓 ClassVibe</div>
        <div>
          <h1 className="cv-topbar-title">{currentPage.label}</h1>
          <div className="cv-topbar-welcome">Welcome back, Student 👋</div>
        </div>
      </div>
      <div className="cv-topbar-right">
        <span className="cv-date">
          <i className="bi bi-calendar-event me-1"></i>
          {today}
        </span>
        <div className="cv-avatar" title="Student profile">
          🧑‍🎓
        </div>
      </div>
    </header>
  );
}

export default Navbar;
