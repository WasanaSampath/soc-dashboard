import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import "./Chart.css";

const COLORS = ["#ef4444", "#f97316", "#facc15"];

/* ---------- Custom Floating Tooltip ---------- */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const total = payload[0].payload.total;
    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

    return (
      <div className="custom-tooltip">
        <p className="label">{payload[0].name}</p>
        <p>{percent}%</p>
      </div>
    );
  }
  return null;
};

function DonutChart() {
  const [data, setData] = useState([]);

  const fetchSeverity = async () => {
    try {
      const res = await fetch("http://localhost:9000/api/severity");
      const severity = await res.json();

      const rawData = [
        { name: "Critical (90–100)", value: severity.critical },
        { name: "High (85–89)", value: severity.high },
        { name: "Medium (30–84)", value: severity.medium },
      ];

      const total = rawData.reduce((sum, item) => sum + item.value, 0);

      const enrichedData = rawData.map((item) => ({
        ...item,
        total,
      }));

      setData(enrichedData);
    } catch (err) {
      console.error("Error fetching severity:", err);
    }
  };

  useEffect(() => {
    fetchSeverity();
    const interval = setInterval(fetchSeverity, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chart-card">
      <h3>Suspicion Score Distribution</h3>

      <div className="chart-wrapper">
        <PieChart width={400} height={250}>
          <Tooltip content={<CustomTooltip />} />

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>

          <Legend iconType="square" />
        </PieChart>
      </div>
    </div>
  );
}

export default DonutChart;
