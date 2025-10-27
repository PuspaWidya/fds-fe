import React, { useMemo } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import ReactECharts from "echarts-for-react";

export default function DashboardFDS() {
  // ====== Mock Data ======
  const userData = [
    { status: "GENUINE", rule_names: "{}" },
    { status: "ALERT", rule_names: '{"Impossible Travel Rule"}' },
    { status: "ALERT", rule_names: '{"Impossible Travel Rule"}' },
    { status: "GENUINE", rule_names: "{}" },
    { status: "ALERT", rule_names: '{"Impossible Travel Rule"}' },
  ];

  const txData = [
    { status: "GENUINE", rule_names: "{}" },
    { status: "ALERT", rule_names: '{"Velocity Rule"}' },
    { status: "GENUINE", rule_names: "{}" },
    { status: "GENUINE", rule_names: "{}" },
    { status: "ALERT", rule_names: '{"Velocity Rule"}' },
    { status: "ALERT", rule_names: '{"Velocity Rule"}' },
  ];

  // ====== Computed Stats ======
  const allAlerts = [...userData, ...txData].filter(
    (d) => d.status === "ALERT"
  );
  const totalTx = txData.length;
  const totalUserAlert = userData.filter((u) => u.status === "ALERT").length;

  const ruleCounts = useMemo(() => {
    const counts = {};
    allAlerts.forEach((a) => {
      const rule = a.rule_names.replace(/[{}\"']/g, "");
      if (rule) counts[rule] = (counts[rule] || 0) + 1;
    });
    return Object.entries(counts).map(([rule, count]) => ({ rule, count }));
  }, [allAlerts]);

  // ====== ECharts Options ======
  const pieOption = {
    title: { text: "Rule Trigger Distribution", left: "center" },
    tooltip: { trigger: "item" },
    legend: { bottom: 0 },
    series: [
      {
        name: "Rules",
        type: "pie",
        radius: "60%",
        data: ruleCounts.map((r) => ({ name: r.rule, value: r.count })),
        label: { formatter: "{b}: {c}" },
      },
    ],
  };

  const barOption = {
    title: { text: "Alert Count by Type", left: "center" },
    xAxis: { type: "category", data: ["User Alerts", "Transaction Alerts"] },
    yAxis: { type: "value" },
    series: [
      {
        data: [totalUserAlert, allAlerts.length - totalUserAlert],
        type: "bar",
        itemStyle: { color: "#1976d2" },
        barWidth: "40%",
      },
    ],
  };

  // ====== Render ======
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        FDS Analytics Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Transactions</Typography>
              <Typography variant="h5">{totalTx}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Alerts</Typography>
              <Typography variant="h5">{allAlerts.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">
                Distinct Rules Triggered
              </Typography>
              <Typography variant="h5">{ruleCounts.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        {/* PIE CHART */}
        <Grid item xs={12} md={12}>
          <Card
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                sx={{ mb: 2 }}
              >
                Distribusi Rule
              </Typography>
              <ReactECharts
                option={pieOption}
                style={{
                  height: 420,
                  width: "100%",
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* BAR CHART */}
        <Grid item>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                sx={{ mb: 2 }}
              >
                Jumlah Alert per Tipe
              </Typography>
              <ReactECharts
                option={barOption}
                style={{
                  height: 420,
                  width: "100%",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Alert Table */}
      <Typography variant="h6" gutterBottom>
        Recent Alerts
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Rule</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allAlerts.map((a, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>
                {txData.includes(a) ? "Transaction" : "User"}
              </TableCell>
              <TableCell>{a.status}</TableCell>
              <TableCell>{a.rule_names.replace(/[{}\"']/g, "")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
