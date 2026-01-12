import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Chart.css";

const data = [
  { day: "Mon", alerts: 60 },
  { day: "Tue", alerts: 20 },
  { day: "Wed", alerts: 90 },
  { day: "Thu", alerts: 30 },
  { day: "Fri", alerts: 10 },
  { day: "Sat", alerts: 80 },
  { day: "Sun", alerts: 95 },
];

function LineChart() {
  return (
    <div className="chart-card wide">
      <h3>Alarm Trend (Last 7 Days)</h3>

      <ResponsiveContainer width="100%" height={220}>
        <ReLineChart data={data}>
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
