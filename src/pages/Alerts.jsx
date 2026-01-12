import { useState } from "react";
import AlertsTable from "../components/tables/AlertsTable";
import InvestigationPanel from "../components/panels/InvestigationPanel";
import "./Alerts.css";

function Alerts() {
  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div className="alerts-page">
      <AlertsTable onSelect={setSelectedAlert} />
      <InvestigationPanel alert={selectedAlert} />
    </div>
  );
}

export default Alerts;
