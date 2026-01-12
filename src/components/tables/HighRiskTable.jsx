import RiskBadge from "./RiskBadge";
import "./Table.css";

const data = [
  {
    ip: "192.168.45.23",
    score: 87,
    risk: "Critical",
    events: 243,
    duration: "14 Days",
    last: "2 min ago",
  },
  {
    ip: "10.0.34.156",
    score: 72,
    risk: "High",
    events: 156,
    duration: "9 Days",
    last: "1 hr ago",
  },
  {
    ip: "172.16.89.44",
    score: 58,
    risk: "Medium",
    events: 89,
    duration: "20 Days",
    last: "5 hr ago",
  },
  {
    ip: "192.168.12.90",
    score: 45,
    risk: "Medium",
    events: 45,
    duration: "7 Days",
    last: "45 min ago",
  },
];

function HighRiskTable() {
  return (
    <div className="table-card">
      <h3>Top High Risk IP Addresses</h3>

      <table>
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Suspicious Score</th>
            <th>Risk Level</th>
            <th>Total Events</th>
            <th>Tracking Duration</th>
            <th>Last Activity</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.ip}</td>
              <td>{row.score}</td>
              <td>
                <RiskBadge level={row.risk} />
              </td>
              <td>{row.events}</td>
              <td>{row.duration}</td>
              <td>{row.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HighRiskTable;
