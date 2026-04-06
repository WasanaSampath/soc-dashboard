import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import "./Chart.css";

function LineChart() {
  const [chartData, setChartData] = useState([]);

  const fetchAlerts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:9000/api/alerts");
      const alerts = await res.json();

      const now = new Date();
      const days = [];

      // Create last 7 days buckets
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);

        days.push({
          key: d.toDateString(),
          day: d.toLocaleDateString("en-US", { weekday: "short" }),
          alerts: 0,
        });
      }

      alerts.forEach((alert) => {
        const time = alert.time;

        // Skip monitoring alerts
        if (!time || time === "monitoring") return;

        const alertDate = new Date(time);

        if (isNaN(alertDate)) return;

        const dateKey = alertDate.toDateString();

        const match = days.find((d) => d.key === dateKey);
        if (match) {
          match.alerts += 1;
        }
      });

      setChartData(days);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  useEffect(() => {
    fetchAlerts();

    const interval = setInterval(fetchAlerts, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chart-card wide">
      <h3>Alarm Trend (Last 7 Days)</h3>

      <ResponsiveContainer width="100%" height={220}>
        <ReLineChart data={chartData}>
          <XAxis dataKey="day" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="alerts"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;
