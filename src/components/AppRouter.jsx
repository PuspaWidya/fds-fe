import { Routes, Route } from "react-router-dom";

import TransactionAlert from "../pages/Transaction/TransactionAlert";
import UserAlert from "../pages/UserDashboard/UserAlert";
import Rules from "../pages/Rule/RuleDashboard";
import Login from "../pages/Auth";

export default function AppRouter() {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />} /> */}
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
