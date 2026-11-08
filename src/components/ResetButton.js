// An instructor tool. The confirmation question uses the browser's built-in window.confirm.
function ResetButton({ onReset }) {
  function handleClick() {
    const sure = window.confirm('Reset ALL demo data? This restores the original sample state.');
    if (sure) {
      onReset();
    }
  }

  return (
    <button type="button" className="btn btn-sm cv-btn-reset w-100" onClick={handleClick}>
      <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Demo Data
    </button>
  );
}

export default ResetButton;
