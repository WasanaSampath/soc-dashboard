import { useEffect, useState } from "react";
import { getAlerts } from "../../api/api";
import "./Table.css";

function AlertsTable({ onSelect }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getAlerts().then(setAlerts);
  }, []);

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Alert ID</th>
            <th>IP Address</th>
            <th>Score</th>
            <th>Risk</th>
            <th>Rule</th>
            <th>Triggered</th>
          </tr>
        </thead>

        <tbody>
          {alerts.map((a) => (
            <tr
              key={a.id}
              onClick={() => onSelect(a)}
              style={{ cursor: "pointer" }}
            >
              <td>{a.id}</td>
              <td>{a.ip}</td>
              <td>{a.score}</td>
              <td>{a.risk}</td>
              <td>{a.rule}</td>
              <td>{new Date(a.time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlertsTable;
