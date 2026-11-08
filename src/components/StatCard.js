// CONCEPT: a reusable function component that receives data through PROPS.
function StatCard({ icon, label, value, color }) {
  return (
    <div className="cv-card cv-stat h-100">
      <div className="cv-stat-icon" style={{ background: color }}>
        {icon}
      </div>
      <div>
        <div className="cv-stat-value">{value}</div>
        <div className="cv-stat-label">{label}</div>
      </div>
    </div>
  );
}

export default StatCard;
