const BASE_URL = "http://127.0.0.1:9000/api";

export async function getDashboardSummary() {
  try {
    const res = await fetch(`${BASE_URL}/dashboard/summary`);
    if (!res.ok) {
      throw new Error("Dashboard API error");
    }
    return await res.json();
  } catch (err) {
    console.error("Dashboard fetch failed:", err);
    return null;
  }
}

export async function getAlerts() {
  try {
    const res = await fetch(`${BASE_URL}/alerts`);
    if (!res.ok) {
      throw new Error("Alerts API error");
    }
    return await res.json();
  } catch (err) {
    console.error("Alerts fetch failed:", err);
    return [];
  }
}
