import { useEffect, useState } from "react";
import { getAlerts } from "../../api/api";
import "./Table.css";

function AlertsTable({ onSelect }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = () => {
      getAlerts().then(setAlerts);
    };
    
    fetchAlerts();
    // Refresh every 5 seconds
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeStr) => {
    if (!timeStr || timeStr === "monitoring" || timeStr === "Ongoing") {
      return timeStr;
    }
    try {
      // If it's already a valid date string, parse it
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
    <div className="table-card">
      <h3>Active Alerts</h3>
      <table>
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>IP Address</th>
            <th>Port</th>
            <th>Score</th>
            <th>Risk</th>
            <th>Rule</th>
            <th>Count</th>
            <th>Triggered</th>
          </tr>
        </thead>

        <tbody>
          {alerts.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", color: "#94a3b8" }}>
                No alerts detected
              </td>
            </tr>
          ) : (
            alerts.map((a) => (
              <tr
                key={a.id}
                onClick={() => onSelect(a)}
                style={{ cursor: "pointer" }}
              >
                <td>{a.id}</td>
                <td>{a.ip}</td>
                <td>{a.port || "-"}</td>
                <td>{a.score}</td>
                <td>
                  <span className={`risk-badge ${a.risk.toLowerCase()}`}>
                    {a.risk}
                  </span>
                </td>
                <td>{a.rule}</td>
                <td>
                  {a.details?.count || a.details?.unique_users || "-"}
                </td>
                <td>{formatTime(a.time)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AlertsTable;