import "./InvestigationPanel.css";

function InvestigationPanel({ alert }) {
  if (!alert) {
    return (
      <div className="investigation-panel">
        <h2>Alert Investigation</h2>
        <p className="empty-state">Select an alert to view details</p>
      </div>
    );
  }

  const formatTime = (timeStr) => {
    if (!timeStr || timeStr === "monitoring" || timeStr === "Ongoing") {
      return timeStr;
    }
    try {
      const date = new Date(timeStr);
      if (!isNaN(date.getTime())) {
        return date.toLocaleString();
      }
      return timeStr;
    } catch (e) {
      return timeStr;
    }
  };

  return (
    <div className="investigation-panel">
      <h2>Alert Investigation</h2>

      <div className="alert-details">
        <div className="detail-row">
          <span className="label">Alert ID:</span>
          <span className="value">{alert.id}</span>
        </div>

        <div className="detail-row">
          <span className="label">IP Address:</span>
          <span className="value">{alert.ip}{alert.port ? `:${alert.port}` : ''}</span>
        </div>

        <div className="detail-row">
          <span className="label">Risk Score:</span>
          <span className="value">{alert.score}</span>
        </div>

        <div className="detail-row">
          <span className="label">Risk Level:</span>
          <span className={`value risk-${alert.risk.toLowerCase()}`}>
            {alert.risk}
          </span>
        </div>

        <div className="detail-row">
          <span className="label">Rule:</span>
          <span className="value">{alert.rule}</span>
        </div>

        {/* Show attack details if available */}
        {alert.details && (
          <>
            {alert.details.count > 0 && (
              <div className="detail-row">
                <span className="label">Failed Attempts:</span>
                <span className="value">{alert.details.count}</span>
              </div>
            )}

            {alert.details.unique_users > 0 && (
              <div className="detail-row">
                <span className="label">Unique Usernames:</span>
                <span className="value">{alert.details.unique_users}</span>
              </div>
            )}

            {alert.details.first_seen && (
              <div className="detail-row">
                <span className="label">Attack Started:</span>
                <span className="value">{formatTime(alert.details.first_seen)}</span>
              </div>
            )}

            {alert.details.last_seen && (
              <div className="detail-row">
                <span className="label">Attack Ended:</span>
                <span className="value">{formatTime(alert.details.last_seen)}</span>
              </div>
            )}
          </>
        )}

        {/* Always show triggered time */}
        <div className="detail-row">
          <span className="label">Alert Triggered:</span>
          <span className="value">{formatTime(alert.time)}</span>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-investigate">Mark as Investigating</button>
        <button className="btn-close">Close Alert</button>
      </div>
    </div>
  );
}

export default InvestigationPanel;