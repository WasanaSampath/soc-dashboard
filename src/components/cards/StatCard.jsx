import "./StatCard.css";

function StatCard({ title, value, subtitle, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-content">
        <h4>{title}</h4>
        <h2>{value}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default StatCard;
