import { useEffect, useState } from "react";
import RiskBadge from "./RiskBadge";
import { getAlerts } from "../../api/api";
import "./Table.css";

function HighRiskTable() {
  const [highRiskData, setHighRiskData] = useState([]);

  useEffect(() => {
    const fetchHighRiskIPs = async () => {
      const alerts = await getAlerts();
      
      // Group alerts by IP and aggregate data
      const ipMap = new Map();
      
      alerts.forEach(alert => {
        const ipKey = alert.ip_port || `${alert.ip}:${alert.port}`;
        
        if (!ipMap.has(ipKey)) {
          ipMap.set(ipKey, {
            ip: alert.ip,
            port: alert.port,
            maxScore: alert.score,
            maxRisk: alert.risk,
            totalEvents: 0,
            firstSeen: alert.details?.first_seen || alert.time,
            lastSeen: alert.details?.last_seen || alert.time,
          });
        }
        
        const existing = ipMap.get(ipKey);
        
        // Update with highest score
        if (alert.score > existing.maxScore) {
          existing.maxScore = alert.score;
          existing.maxRisk = alert.risk;
        }
        
        // Count events
        existing.totalEvents += alert.details?.count || 1;
        
        // Update timestamps
        if (alert.details?.first_seen && 
            new Date(alert.details.first_seen) < new Date(existing.firstSeen)) {
          existing.firstSeen = alert.details.first_seen;
        }
        if (alert.details?.last_seen && 
            new Date(alert.details.last_seen) > new Date(existing.lastSeen)) {
          existing.lastSeen = alert.details.last_seen;
        }
      });
      
      // Convert to array and calculate tracking duration
      const data = Array.from(ipMap.values()).map(item => {
        const duration = calculateDuration(item.firstSeen, item.lastSeen);
        const lastActivity = calculateLastActivity(item.lastSeen);
        
        return {
          ip: item.ip,
          port: item.port,
          score: item.maxScore,
          risk: item.maxRisk,
          events: item.totalEvents,
          duration: duration,
          last: lastActivity,
        };
      });
      
      // Sort by score (highest first) and take top entries
      const sorted = data
        .filter(item => item.risk === "High" || item.risk === "Critical")
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      
      setHighRiskData(sorted);
    };
    
    fetchHighRiskIPs();
    const interval = setInterval(fetchHighRiskIPs, 5000);
    return () => clearInterval(interval);
  }, []);

  const calculateDuration = (firstSeen, lastSeen) => {
    try {
      const first = new Date(firstSeen);
      const last = new Date(lastSeen);
      const diffMs = last - first;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (diffDays > 0) return `${diffDays} Days`;
      if (diffHours > 0) return `${diffHours} Hours`;
      return "< 1 Hour";
    } catch (e) {
      return "Unknown";
    }
  };

  const calculateLastActivity = (lastSeen) => {
    try {
      const last = new Date(lastSeen);
      const now = new Date();
      const diffMs = now - last;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins} min ago`;
      if (diffHours < 24) return `${diffHours} hr ago`;
      return `${Math.floor(diffHours / 24)} days ago`;
    } catch (e) {
      return lastSeen;
    }
  };

  return (
    <div className="table-card">
      <h3>Top High Risk IP Addresses</h3>

      <table>
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Port</th>
            <th>Suspicious Score</th>
            <th>Risk Level</th>
            <th>Total Events</th>
            <th>Tracking Duration</th>
            <th>Last Activity</th>
          </tr>
        </thead>

        <tbody>
          {highRiskData.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", color: "#94a3b8" }}>
                No high-risk IPs detected
              </td>
            </tr>
          ) : (
            highRiskData.map((row, index) => (
              <tr key={index}>
                <td>{row.ip}</td>
                <td>{row.port || "-"}</td>
                <td>{row.score}</td>
                <td>
                  <RiskBadge level={row.risk} />
                </td>
                <td>{row.events}</td>
                <td>{row.duration}</td>
                <td>{row.last}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HighRiskTable;