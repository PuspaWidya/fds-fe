import React, { useMemo } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// ---------------------------
// Contoh data (pakai data yang kamu kirim)
// ---------------------------
const SAMPLE_USER = [
  {
    username: "johndoe",
    channel_code: "MOBAPP",
    device_long: "106.816666",
    created_at: "2025-09-29T20:44:48.936775+00:00",
    company_id: "COMP001",
    device_name: "Samsung Galaxy S21",
    current_saldo: 7500000.5,
    activity_type: "LOGIN",
    mobile_number: "6281234567890",
    response_code: "00",
    cif_number: "CIF20250930",
    id: "ACC202509300101",
    activity_status: "SUCCESS",
    new_mobile_number: null,
    response_message: "Login berhasil",
    activity_datetime: "2025-09-30T10:20:00",
    activity_register_mdin: "MDIN001",
    reference_number: "REF202509300001",
    account_number: "1234567890",
    ip_address: "192.168.1.11",
    device_imei: "356938035643809",
    status: "GENUINE",
    device_id: "DEV123456",
    device_ip: "192.168.1.11",
    rule_names: "{}",
    branch_code: "BR001",
    device_lat: "-6.200000",
  },
  {
    username: "johndoe",
    channel_code: "MOBAPP",
    device_long: "106.816666",
    created_at: "2025-09-29T20:45:13.692447+00:00",
    company_id: "COMP001",
    device_name: "Samsung Galaxy S21",
    current_saldo: 7500000.5,
    activity_type: "LOGIN",
    mobile_number: "6281234567890",
    response_code: "00",
    cif_number: "CIF20250930",
    id: "ACC202509300102",
    activity_status: "SUCCESS",
    new_mobile_number: null,
    response_message: "Login berhasil",
    activity_datetime: "2025-09-30T10:22:00",
    activity_register_mdin: "MDIN001",
    reference_number: "REF202509300001",
    account_number: "1234567890",
    ip_address: "192.168.1.11",
    device_imei: "356938035643809",
    status: "GENUINE",
    device_id: "DEV123456",
    device_ip: "192.168.1.11",
    rule_names: "{}",
    branch_code: "BR001",
    device_lat: "-7.200000",
  },
  {
    username: "johndoe",
    channel_code: "MOBAPP",
    device_long: "106.816666",
    created_at: "2025-09-29T20:45:58.163372+00:00",
    company_id: "COMP001",
    device_name: "Samsung Galaxy S21",
    current_saldo: 7500000.5,
    activity_type: "LOGIN",
    mobile_number: "6281234567890",
    response_code: "00",
    cif_number: "CIF20250930",
    id: "ACC202509300103",
    activity_status: "SUCCESS",
    new_mobile_number: null,
    response_message: "Login berhasil",
    activity_datetime: "2025-09-30T10:25:00",
    activity_register_mdin: "MDIN001",
    reference_number: "REF202509300001",
    account_number: "1234567890",
    ip_address: "192.168.1.11",
    device_imei: "356938035643809",
    status: "ALERT",
    device_id: "DEV123456",
    device_ip: "192.168.1.11",
    rule_names: '{"Impossible Travel Rule"}',
    branch_code: "BR001",
    device_lat: "-8.200000",
  },
  {
    username: "johndoe",
    channel_code: "MOBAPP",
    device_long: "106.816666",
    created_at: "2025-09-29T21:38:22.564961+00:00",
    company_id: "COMP001",
    device_name: "Samsung Galaxy S21",
    current_saldo: 7500000.5,
    activity_type: "LOGIN",
    mobile_number: "6281234567890",
    response_code: "00",
    cif_number: "CIF20250930",
    id: "ACC202509300110",
    activity_status: "SUCCESS",
    new_mobile_number: null,
    response_message: "Login berhasil",
    activity_datetime: "2025-09-30T13:20:00",
    activity_register_mdin: "MDIN001",
    reference_number: "REF202509300001",
    account_number: "1234567890",
    ip_address: "192.168.1.11",
    device_imei: "356938035643809",
    status: "GENUINE",
    device_id: "DEV123456",
    device_ip: "192.168.1.11",
    rule_names: "{}",
    branch_code: "BR001",
    device_lat: "-6.200000",
  },
  {
    username: "johndoe",
    channel_code: "MOBAPP",
    device_long: "106.816666",
    created_at: "2025-09-29T21:38:53.957909+00:00",
    company_id: "COMP001",
    device_name: "Samsung Galaxy S21",
    current_saldo: 7500000.5,
    activity_type: "LOGIN",
    mobile_number: "6281234567890",
    response_code: "00",
    cif_number: "CIF20250930",
    id: "ACC202509300111",
    activity_status: "SUCCESS",
    new_mobile_number: null,
    response_message: "Login berhasil",
    activity_datetime: "2025-09-30T13:20:10",
    activity_register_mdin: "MDIN001",
    reference_number: "REF202509300001",
    account_number: "1234567890",
    ip_address: "192.168.1.11",
    device_imei: "356938035643809",
    status: "ALERT",
    device_id: "DEV123456",
    device_ip: "192.168.1.11",
    rule_names: '{"Impossible Travel Rule"}',
    branch_code: "BR001",
    device_lat: "-7.200000",
  },
];

const SAMPLE_TX = [
  {
    account_number: "1234567890",
    transaction_type: "DEBIT",
    merchant_category_code: "5411",
    reference_number: "REF202509300001",
    card_number: "4212345678901234",
    cif_number: "CIF20250930",
    balance_source: "SAVINGS",
    owner_code_bank_device: "BNI01",
    status: "string",
    destination_account: "9876543210",
    destination_bank_code: "014",
    terminal_id: "TERM1234",
    rule_names: "string",
    transaction_amount: 250000.75,
    geo_location: "-6.200000,106.816666",
    location_terminal: "Jakarta Pusat",
    created_at: "2025-09-29T20:32:14.676204+00:00",
    card_type: "VISA",
    current_saldo: 7500000.25,
    ip_address: "192.168.1.10",
    approval_status: "APPROVED",
    transaction_datetime: "2025-09-30T10:15:00",
    channel_code: "MOBAPP",
    auth_response_code: "00",
    transaction_category: "TRANSFER",
    merchant_code: "MRC12345",
    pos_entry_mode: "CHIP",
    transaction_id: "TXN202509300100",
    merchant_name: "Toko Elektronik Jaya",
    customer_age_group: "26-35",
  },
  {
    account_number: "1234567890",
    transaction_type: "DEBIT",
    merchant_category_code: "5411",
    reference_number: "REF202509300001",
    card_number: "4212345678901234",
    cif_number: "CIF20250930",
    balance_source: "SAVINGS",
    owner_code_bank_device: "BNI01",
    status: "ALERT",
    destination_account: "9876543210",
    destination_bank_code: "014",
    terminal_id: "TERM1234",
    rule_names: '{"Velocity Rule"}',
    transaction_amount: 9900000,
    geo_location: "-6.200000,106.816666",
    location_terminal: "Jakarta Pusat",
    created_at: "2025-09-29T20:38:02.857593+00:00",
    card_type: "VISA",
    current_saldo: 7500000,
    ip_address: "192.168.1.10",
    approval_status: "APPROVED",
    transaction_datetime: "2025-09-30T10:15:05",
    channel_code: "MOBAPP",
    auth_response_code: "00",
    transaction_category: "TRANSFER",
    merchant_code: "MRC12345",
    pos_entry_mode: "CHIP",
    transaction_id: "TXN202509300103",
    merchant_name: "Toko Elektronik Jaya",
    customer_age_group: "26-35",
  },
  {
    account_number: "1234567890",
    transaction_type: "DEBIT",
    merchant_category_code: "5411",
    reference_number: "REF202509300001",
    card_number: "4212345678901234",
    cif_number: "CIF20250930",
    balance_source: "SAVINGS",
    owner_code_bank_device: "BNI01",
    status: "GENUINE",
    destination_account: "9876543210",
    destination_bank_code: "014",
    terminal_id: "TERM1234",
    rule_names: "{}",
    transaction_amount: 250000.75,
    geo_location: "-6.200000,106.816666",
    location_terminal: "Jakarta Pusat",
    created_at: "2025-09-29T21:26:24.604214+00:00",
    card_type: "VISA",
    current_saldo: 7500000.25,
    ip_address: "192.168.1.10",
    approval_status: "APPROVED",
    transaction_datetime: "2025-09-30T12:15:00",
    channel_code: "MOBAPP",
    auth_response_code: "00",
    transaction_category: "TRANSFER",
    merchant_code: "MRC12345",
    pos_entry_mode: "CHIP",
    transaction_id: "TXN202509300110",
    merchant_name: "Toko Elektronik Jaya",
    customer_age_group: "26-35",
  },
  {
    account_number: "1234567890",
    transaction_type: "DEBIT",
    merchant_category_code: "5411",
    reference_number: "REF202509300001",
    card_number: "4212345678901234",
    cif_number: "CIF20250930",
    balance_source: "SAVINGS",
    owner_code_bank_device: "BNI01",
    status: "GENUINE",
    destination_account: "9876543210",
    destination_bank_code: "014",
    terminal_id: "TERM1234",
    rule_names: "{}",
    transaction_amount: 5000000,
    geo_location: "-6.200000,106.816666",
    location_terminal: "Jakarta Pusat",
    created_at: "2025-09-29T21:27:05.167073+00:00",
    card_type: "VISA",
    current_saldo: 7500000.25,
    ip_address: "192.168.1.10",
    approval_status: "APPROVED",
    transaction_datetime: "2025-09-30T12:15:05",
    channel_code: "MOBAPP",
    auth_response_code: "00",
    transaction_category: "TRANSFER",
    merchant_code: "MRC12345",
    pos_entry_mode: "CHIP",
    transaction_id: "TXN202509300111",
    merchant_name: "Toko Elektronik Jaya",
    customer_age_group: "26-35",
  },
  {
    account_number: "1234567890",
    transaction_type: "DEBIT",
    merchant_category_code: "5411",
    reference_number: "REF202509300001",
    card_number: "4212345678901234",
    cif_number: "CIF20250930",
    balance_source: "SAVINGS",
    owner_code_bank_device: "BNI01",
    status: "ALERT",
    destination_account: "9876543210",
    destination_bank_code: "014",
    terminal_id: "TERM1234",
    rule_names: '{"Velocity Rule"}',
    transaction_amount: 5000000,
    geo_location: "-6.200000,106.816666",
    location_terminal: "Jakarta Pusat",
    created_at: "2025-09-29T21:27:19.877297+00:00",
    card_type: "VISA",
    current_saldo: 7500000.25,
    ip_address: "192.168.1.10",
    approval_status: "APPROVED",
    transaction_datetime: "2025-09-30T12:15:10",
    channel_code: "MOBAPP",
    auth_response_code: "00",
    transaction_category: "TRANSFER",
    merchant_code: "MRC12345",
    pos_entry_mode: "CHIP",
    transaction_id: "TXN202509300112",
    merchant_name: "Toko Elektronik Jaya",
    customer_age_group: "26-35",
  },
  {
    account_number: "1234567890",
    transaction_type: "DEBIT",
    merchant_category_code: "5411",
    reference_number: "REF202509300001",
    card_number: "4212345678901234",
    cif_number: "CIF20250930",
    balance_source: "SAVINGS",
    owner_code_bank_device: "BNI01",
    status: "ALERT",
    destination_account: "9876543210",
    destination_bank_code: "014",
    terminal_id: "TERM1234",
    rule_names: '{"Velocity Rule"}',
    transaction_amount: 5000000,
    geo_location: "-6.200000,106.816666",
    location_terminal: "Jakarta Pusat",
    created_at: "2025-09-29T21:31:52.916302+00:00",
    card_type: "VISA",
    current_saldo: 7500000.25,
    ip_address: "192.168.1.10",
    approval_status: "APPROVED",
    transaction_datetime: "2025-09-30T12:15:15",
    channel_code: "MOBAPP",
    auth_response_code: "00",
    transaction_category: "TRANSFER",
    merchant_code: "MRC12345",
    pos_entry_mode: "CHIP",
    transaction_id: "TXN202509300114",
    merchant_name: "Toko Elektronik Jaya",
    customer_age_group: "26-35",
  },
];

// ---------------------------
// Helper: parsing rule_names (robust for formats like "{}", "{\"Velocity Rule\"}", "string")
// ---------------------------
function parseRuleNames(raw) {
  if (!raw || raw === "{}" || raw === "string") return [];
  try {
    // Try JSON parse first (if it's a JSON string)
    const maybe = JSON.parse(raw);
    if (Array.isArray(maybe)) return maybe;
    if (typeof maybe === "object") return Object.keys(maybe);
    if (typeof maybe === "string") raw = maybe;
  } catch (e) {
    // not JSON -- fall through to string cleanup
  }
  // cleanup braces and quotes then split by comma
  const cleaned = raw.replace(/[{}\"]+/g, "").trim();
  if (!cleaned) return [];
  return cleaned
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// small palette for pie
const COLORS = ["#4caf50", "#ff9800", "#f44336", "#3f51b5", "#009688"];

export default function DashboardFDS({
  userData = SAMPLE_USER,
  txData = SAMPLE_TX,
}) {
  // metrics
  const totalTransactions = txData.length;
  const totalAlerts = useMemo(() => {
    const u = userData.filter(
      (u) => (u.status || "").toUpperCase() === "ALERT"
    );
    const t = txData.filter((t) => (t.status || "").toUpperCase() === "ALERT");
    return u.length + t.length;
  }, [userData, txData]);

  const uniqueCIF = useMemo(
    () => new Set(userData.map((u) => u.cif_number)).size,
    [userData]
  );

  const ruleCounts = useMemo(() => {
    const counts = {};
    const all = [...userData, ...txData];
    all.forEach((r) => {
      const names = parseRuleNames(r.rule_names);
      names.forEach((n) => (counts[n] = (counts[n] || 0) + 1));
    });
    // convert to array for recharts
    return Object.entries(counts).map(([rule, count]) => ({ rule, count }));
  }, [userData, txData]);

  // trend: group alerts per hour (based on activity_datetime or transaction_datetime)
  const alertTrend = useMemo(() => {
    const allAlerts = [
      ...userData.filter((u) => (u.status || "").toUpperCase() === "ALERT"),
      ...txData.filter((t) => (t.status || "").toUpperCase() === "ALERT"),
    ];
    const map = {};
    allAlerts.forEach((a) => {
      const dt = a.activity_datetime || a.transaction_datetime || a.created_at;
      if (!dt) return;
      const d = new Date(dt);
      // use date-hour label
      const label = d.toISOString().slice(0, 13).replace("T", " ");
      map[label] = (map[label] || 0) + 1;
    });
    return Object.entries(map)
      .map(([time, count]) => ({ time, count }))
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [userData, txData]);

  // top channels by count (from transactions)
  const topChannels = useMemo(() => {
    const map = {};
    txData.forEach((t) => {
      const c = t.channel_code || "UNKNOWN";
      map[c] = (map[c] || 0) + 1;
    });
    return Object.entries(map).map(([channel, count]) => ({ channel, count }));
  }, [txData]);

  // recent alerts combined
  const recentAlerts = useMemo(() => {
    const mappedUsers = userData.map((u) => ({
      id: u.id,
      datetime: u.activity_datetime || u.created_at,
      cif: u.cif_number,
      type: u.activity_type || "USER",
      rule: parseRuleNames(u.rule_names).join(", ") || "-",
      status: u.status || "-",
    }));
    const mappedTx = txData.map((t) => ({
      id: t.transaction_id,
      datetime: t.transaction_datetime || t.created_at,
      cif: t.cif_number,
      type: t.transaction_category || "TX",
      rule: parseRuleNames(t.rule_names).join(", ") || "-",
      status: t.status || "-",
      amount: t.transaction_amount,
      merchant: t.merchant_name,
    }));
    const combined = [...mappedUsers, ...mappedTx].sort((a, b) =>
      (b.datetime || "").localeCompare(a.datetime || "")
    );
    return combined.slice(0, 10);
  }, [userData, txData]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        FDS Analytics Dashboard
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Transactions</Typography>
              <Typography variant="h6">{totalTransactions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Alerts</Typography>
              <Typography variant="h6">{totalAlerts}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Unique CIF</Typography>
              <Typography variant="h6">{uniqueCIF}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Rules Triggered</Typography>
              <Typography variant="h6">{ruleCounts.length || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="subtitle1">Rule Distribution</Typography>
            {ruleCounts.length ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={ruleCounts}
                    dataKey="count"
                    nameKey="rule"
                    outerRadius={80}
                    label
                  >
                    {ruleCounts.map((_, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={COLORS[idx % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2">No rules triggered</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="subtitle1">Alert Trend (by hour)</Typography>
            {alertTrend.length ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={alertTrend}>
                  <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#1976d2"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2">No alerts in trend</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 360 }}>
            <Typography variant="subtitle1">Top Channels</Typography>
            {topChannels.length ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topChannels} layout="vertical">
                  <XAxis type="number" />
                  <YAxis dataKey="channel" type="category" />
                  <Tooltip />
                  <Bar dataKey="count" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ mt: 4 }}>
                <Typography variant="body2">No channel data</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1">
              Recent Alerts (combined)
            </Typography>
            <Divider sx={{ my: 1 }} />
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Datetime</TableCell>
                    <TableCell>CIF</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Rule</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Merchant</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentAlerts.map((r) => (
                    <TableRow key={r.id || Math.random()}>
                      <TableCell>{r.datetime}</TableCell>
                      <TableCell>{r.cif}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell>{r.rule}</TableCell>
                      <TableCell>{r.status}</TableCell>
                      <TableCell>{r.amount != null ? r.amount : "-"}</TableCell>
                      <TableCell>{r.merchant || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
