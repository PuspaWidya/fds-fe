import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/DashboardFDS";
// import LiveAlert from "../pages/LiveAlert";
import TransactionAlert from "../pages/Transaction/TransactionAlert";
import UserAlert from "../pages/UserDashboard/UserAlert";
import Rules from "../pages/Rule/RuleDashboard";
import Login from "../pages/Auth/Login";
import CreateRuleFDS from "../pages/Rule/CreateRuleFDS";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-rule" element={<CreateRuleFDS />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Rules />} />
      <Route path="/transaction-alert" element={<TransactionAlert />} />
      <Route path="/user-alert" element={<UserAlert />} />
      {/* <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/office/:name" element={<OfficePage />} /> */}
    </Routes>
  );
}
