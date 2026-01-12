import { PieChart, Pie, Cell, Legend } from "recharts";
import "./Chart.css";

const data = [
  { name: "Critical (70–100)", value: 40 },
  { name: "High (50–69)", value: 35 },
  { name: "Medium (30–49)", value: 25 },
];

const COLORS = ["#ef4444", "#f97316", "#facc15"];

function DonutChart() {
  return (
    <div className="chart-card">
      <h3>Suspicion Score Distribution</h3>

      <PieChart width={260} height={220}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}

export default DonutChart;
