import "./Panel.css";

function InvestigationPanel({ alert }) {
  if (!alert) {
    return (
      <div className="panel empty">
        <p>Select an alert to investigate</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h3>Alert Investigation</h3>

      <p><strong>Alert ID:</strong> {alert.id}</p>
      <p><strong>IP Address:</strong> {alert.ip}</p>
      <p><strong>Risk Score:</strong> {alert.score}</p>
      <p><strong>Risk Level:</strong> {alert.risk}</p>
      <p><strong>Rule:</strong> {alert.rule}</p>

      <hr />

      <button className="action-btn">Mark as Investigating</button>
      <button className="action-btn secondary">Close Alert</button>
    </div>
  );
}

export default InvestigationPanel;
