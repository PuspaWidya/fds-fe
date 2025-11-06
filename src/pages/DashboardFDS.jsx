// DashboardFDS_3perRow.jsx
import React, { useMemo } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Divider,
  Stack,
  Tooltip,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

export default function DashboardFDS() {
  // ====== Mock Data ======
  const fdsData = [
    { type: "USER", status: "GENUINE", rule_names: "{}" },
    { type: "USER", status: "ALERT", rule_names: '{"Impossible Travel Rule"}' },
    { type: "TX", status: "ALERT", rule_names: '{"Velocity Rule"}' },
    { type: "TX", status: "GENUINE", rule_names: "{}" },
    { type: "TX", status: "ALERT", rule_names: '{"Velocity Rule"}' },
    { type: "TX", status: "GENUINE", rule_names: "{}" },
  ];

  const allAlerts = fdsData.filter((d) => d.status === "ALERT");
  const totalRecords = fdsData.length;
  const ruleCounts = useMemo(() => {
    const counts = {};
    allAlerts.forEach((a) => {
      const rule = a.rule_names.replace(/[{}\"']/g, "");
      if (rule) counts[rule] = (counts[rule] || 0) + 1;
    });
    return Object.entries(counts).map(([rule, count]) => ({ rule, count }));
  }, [allAlerts]);

  // ====== KPI Data ======
  const kpis = [
    {
      label: "Total Records",
      value: totalRecords,
      pct: "+8%",
      data: [1, 2, 2, 3, 2, 4],
    },
    {
      label: "Total Alerts",
      value: allAlerts.length,
      pct: "-3%",
      data: [1, 1, 1, 2, 1, 1],
    },
    {
      label: "Distinct Rules",
      value: ruleCounts.length,
      pct: "+12%",
      data: [0, 0, 1, 1, 1, 2],
    },
  ];

  // ====== Chart Options ======
  const pieOption = {
    color: ["#60a5fa", "#bfdbfe"],
    tooltip: { trigger: "item" },
    legend: { bottom: 0, textStyle: { color: "#475569" } },
    series: [
      {
        type: "pie",
        radius: "60%",
        data: ruleCounts.map((r) => ({ name: r.rule, value: r.count })),
        label: { show: false },
      },
    ],
  };

  const barOption = {
    color: ["#2563eb"],
    tooltip: { trigger: "axis" },
    grid: { top: 20, right: 10, left: 30, bottom: 30 },
    xAxis: {
      type: "category",
      data: ["User Alerts", "Transaction Alerts"],
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { color: "#e2e8f0" } },
    },
    series: [
      {
        data: [
          fdsData.filter((d) => d.type === "USER" && d.status === "ALERT")
            .length,
          fdsData.filter((d) => d.type === "TX" && d.status === "ALERT").length,
        ],
        type: "bar",
        barWidth: "40%",
        itemStyle: { borderRadius: [8, 8, 0, 0] },
      },
    ],
  };

  const donutOption = {
    color: ["#2563eb", "#dbeafe"],
    legend: { bottom: 0, textStyle: { color: "#475569" } },
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],
        label: { formatter: "{b}: {d}%" },
        data: [
          {
            name: "GENUINE",
            value: fdsData.filter((d) => d.status === "GENUINE").length,
          },
          { name: "ALERT", value: allAlerts.length },
        ],
      },
    ],
  };

  const ruleBarOption = {
    color: ["#3b82f6"],
    tooltip: {},
    xAxis: { type: "value" },
    yAxis: { type: "category", data: ruleCounts.map((r) => r.rule) },
    series: [
      {
        data: ruleCounts.map((r) => r.count),
        type: "bar",
        barWidth: "40%",
        itemStyle: { borderRadius: [6, 6, 0, 0] },
      },
    ],
  };

  const trendOption = {
    color: ["#2563eb"],
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["29 Sep", "30 Sep", "1 Oct", "2 Oct"],
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: { type: "value", splitLine: { lineStyle: { color: "#e2e8f0" } } },
    series: [
      {
        data: [2, 3, 4, 5],
        type: "line",
        smooth: true,
        areaStyle: { color: "rgba(37,99,235,0.12)" },
        symbol: "circle",
        lineStyle: { width: 3 },
      },
    ],
  };

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#1e293b",
      borderWidth: 0,
      textStyle: { color: "#f8fafc", fontSize: 13 },
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "rgba(99,102,241,0.5)",
          width: 1.5,
        },
      },
    },
    grid: { left: 40, right: 20, top: 40, bottom: 30 },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisLine: { lineStyle: { color: "#e2e8f0" } },
      axisLabel: { color: "#475569", fontSize: 12 },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      splitLine: { lineStyle: { color: "#f1f5f9" } },
      axisLabel: { color: "#475569", fontSize: 12 },
    },
    series: [
      {
        name: "True Fraud Detected",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { width: 3, color: "#6366f1" },
        itemStyle: { color: "#6366f1" },
        areaStyle: { color: "rgba(99,102,241,0.08)" },
        data: [50, 65, 80, 72, 95, 120, 110, 130, 145, 160, 180, 190],
      },
      {
        name: "False Alerts",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { width: 3, color: "#fbbf24" },
        itemStyle: { color: "#fbbf24" },
        areaStyle: { color: "rgba(251,191,36,0.08)" },
        data: [120, 100, 130, 140, 135, 150, 140, 160, 170, 155, 145, 140],
      },
      {
        name: "Missed Frauds",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { width: 3, color: "#38bdf8" },
        itemStyle: { color: "#38bdf8" },
        areaStyle: { color: "rgba(56,189,248,0.08)" },
        data: [20, 15, 18, 22, 25, 28, 30, 27, 24, 20, 22, 18],
      },
    ],
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f8faff",
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={800} sx={{ color: "#0f172a" }}>
          Insight
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          Overview dashboard
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        {kpis.map((kpi, i) => (
          <Grid item xs={12} md={4} key={i} size={4}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                width: 340,
              }}
            >
              {/* Title */}
              <Typography variant="subtitle2" sx={{ color: "#64748b", mb: 1 }}>
                {kpi.label}
              </Typography>

              {/* Value + Badge */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="h4"
                  fontWeight="700"
                  sx={{ color: "#0f172a" }}
                >
                  {kpi.value}
                </Typography>
                <Tooltip title="Compared to yesterday" arrow placement="top">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      px: 1,
                      py: 0.3,
                      borderRadius: 1,
                      backgroundColor: "rgba(34,197,94,0.08)",
                      color: "#16a34a",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    <TrendingUpRoundedIcon sx={{ fontSize: 18 }} />
                    2.15%
                  </Box>
                </Tooltip>
              </Stack>

              {/* Subtext */}
              <Typography
                variant="body2"
                sx={{
                  color: "#94a3b8",
                  mt: 2,
                }}
              >
                From Jan 01, 2024 - March 30, 2024
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card
        sx={{
          borderRadius: 4,
          background: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          p: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{ color: "#0f172a", mb: 2 }}
          >
            Analytical Overview
          </Typography>

          <ReactECharts
            option={option}
            style={{ height: 360, width: "100%" }}
          />
        </CardContent>
      </Card>
      {/* Charts (3 per baris) */}
      {/* <Grid container spacing={3} mb={4} size={4}>
        {[
          { title: "Rule Distribution", option: pieOption },
          { title: "Alert Count by Type", option: barOption },
          { title: "Transaction Status Ratio", option: donutOption },
          { title: "Top Rules Triggered", option: ruleBarOption },
          { title: "Alert Trend Over Time", option: trendOption },
        ].map((chart, i) => (
          <Grid item xs={12} md={4} key={i} size={4}>
            <Card
              sx={{
                borderRadius: 4,
                background: "#fff",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                p: 3,
                mx: 1,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="subtitle1" sx={{ color: "#0f172a" }}>
                  {chart.title}
                </Typography>
                {chart.title === "Alert Trend Over Time" && (
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Last 7 days
                  </Typography>
                )}
              </Box>
              <ReactECharts option={chart.option} style={{ height: 260 }} />
            </Card>
          </Grid>
        ))}
      </Grid> */}

      {/* Table */}
      <Divider sx={{ mb: 3 }} />
      <Card
        sx={{
          borderRadius: 4,
          background: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
      >
        <Box p={3}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6" sx={{ color: "#0f172a" }}>
              Recent Alerts
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Showing latest {allAlerts.length} alerts
            </Typography>
          </Box>

          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f1f5f9" }}>
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
                  <TableCell>{a.type}</TableCell>
                  <TableCell sx={{ color: "#dc2626" }}>{a.status}</TableCell>
                  <TableCell>{a.rule_names.replace(/[{}\"']/g, "")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
}
