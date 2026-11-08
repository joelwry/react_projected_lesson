import { useEffect } from 'react';

// CONCEPTS: props + useEffect. Every page shows a heading, and the browser tab title is updated too.
function PageHeader({ emoji, title, subtitle }) {
  useEffect(() => {
    document.title = 'ClassVibe | ' + title;
  }, [title]);

  return (
    <div className="cv-page-header">
      <div className="cv-page-emoji">{emoji}</div>
      <div>
        <h2 className="h3 fw-bold mb-1">{title}</h2>
        <p className="mb-0 text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

export default PageHeader;
