import { useState, useRef, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import SuggestionCard from '../components/SuggestionCard';

// CONCEPTS: controlled inputs, onChange, onSubmit, validation, updating an object in state,
// useRef (focus), useEffect (document title), .map(), empty state.
function Suggestions({ suggestions, onAdd, onDelete }) {
  // One state object holds all three form fields.
  const [form, setForm] = useState({ name: '', title: '', description: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  // useRef gives us direct access to the title <input> so we can focus it.
  const titleInputRef = useRef(null);

  // useEffect: the browser tab shows how many suggestions there are.
  useEffect(() => {
    document.title = 'ClassVibe | Suggestions (' + suggestions.length + ')';
  }, [suggestions.length]);

  // Runs on every keystroke. [event.target.name] is the field being typed in.
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setSuccess('');
  }

  function validate() {
    const newErrors = {};
    if (form.name.trim() === '') newErrors.name = 'Please tell us your name.';
    if (form.title.trim() === '') newErrors.title = 'Please give your suggestion a title.';
    else if (form.title.trim().length < 3) newErrors.title = 'The title needs at least 3 characters.';
    if (form.description.trim() === '') newErrors.description = 'Please describe your idea.';
    else if (form.description.trim().length < 10) newErrors.description = 'Tell us a little more (at least 10 characters).';
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onAdd({
      id: Date.now(),
      name: form.name.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      date: new Date().toISOString(),
    });
    setForm({ name: '', title: '', description: '' });
    setSuccess('🎉 Thank you! Your suggestion was added.');
  }

  function focusTitle() {
    titleInputRef.current.focus();
  }

  return (
    <>
      <PageHeader emoji="💡" title="Suggestion Board" subtitle="Got an idea to make our class better? Share it!" />

      <div className="row g-4">
        <div className="col-12 col-xl-5">
          <div className="cv-card">
            <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
              <h3 className="h5 fw-bold mb-0">New suggestion</h3>
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={focusTitle}>
                ✍️ Jump to title
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">Student name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={errors.name ? 'form-control is-invalid' : 'form-control'}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Amara"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-semibold">Suggestion title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  ref={titleInputRef}
                  className={errors.title ? 'form-control is-invalid' : 'form-control'}
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Coding games on Fridays"
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-semibold">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className={errors.description ? 'form-control is-invalid' : 'form-control'}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Explain your idea..."
                ></textarea>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>

              <button type="submit" className="btn cv-btn-primary w-100">Submit suggestion</button>
              {success && (
                <div className="cv-feedback mt-3" role="status">
                  {success}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="col-12 col-xl-7">
          <h3 className="h5 fw-bold mb-3">
            Classmates' suggestions <span className="badge cv-badge-points">{suggestions.length}</span>
          </h3>
          {suggestions.length === 0 ? (
            <div className="cv-card cv-empty-big">
              <div className="display-4">📭</div>
              <p className="mb-0">No suggestions yet. Add the first one using the form!</p>
            </div>
          ) : (
            <div className="row g-3">
              {[...suggestions].reverse().map((suggestion) => (
                <div className="col-12 col-md-6" key={suggestion.id}>
                  <SuggestionCard suggestion={suggestion} onDelete={onDelete} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Suggestions;
