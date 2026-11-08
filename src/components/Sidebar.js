import { NavLink } from 'react-router-dom';
import { PAGES } from '../data/pages';
import ResetButton from './ResetButton';

// CONCEPTS: .map() with keys, NavLink (highlights the active page), props.
function Sidebar({ onReset }) {
  return (
    <aside className="cv-sidebar">
      <div className="cv-logo">
        <span className="cv-logo-mark">🎓</span>
        <span>ClassVibe</span>
      </div>

      <nav className="cv-nav">
        {PAGES.map((page) => (
          <NavLink
            key={page.path}
            to={page.path}
            end={page.path === '/'}
            className={({ isActive }) => (isActive ? 'cv-nav-link active' : 'cv-nav-link')}
          >
            <i className={'bi ' + page.icon}></i>
            <span>{page.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="cv-sidebar-footer">
        <div className="small fw-semibold mb-2">👩‍🏫 Instructor tools</div>
        <ResetButton onReset={onReset} />
      </div>
    </aside>
  );
}

export default Sidebar;
