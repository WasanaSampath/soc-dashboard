import { useEffect, useState } from "react";
import StatCard from "../components/cards/StatCard";
import DonutChart from "../components/charts/DonutChart";
import LineChart from "../components/charts/LineChart";
import HighRiskTable from "../components/tables/HighRiskTable";
import { getDashboardSummary } from "../api/api";
import "./Dashboard.css";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    getDashboardSummary().then(setSummary);
  }, []);

  if (!summary) {
  return (
    <div className="dashboard">
      <p style={{ color: "#94a3b8" }}>
        Waiting for backend data…
      </p>
    </div>
  );
}


  return (
    <div className="dashboard">
      <div className="stats-row">
        <StatCard title="High Risk IPs" value={summary.high_risk_ips} subtitle="Detected" color="red" />
        <StatCard title="IPs Under Tracking" value={summary.ips_under_tracking} subtitle="Active" color="green" />
        <StatCard title="Active Alarms" value={summary.active_alarms} subtitle="Open" color="yellow" />
        <StatCard title="Events / Hour" value={summary.events_per_hour} subtitle="Live" color="blue" />
      </div>

      <div className="charts-row">
        <DonutChart />
        <LineChart />
      </div>

      <HighRiskTable />
    </div>
  );
}

export default Dashboard;
