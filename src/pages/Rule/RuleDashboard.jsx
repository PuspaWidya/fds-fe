/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Divider,
  Chip,
} from "@mui/material";
import { Edit, Settings } from "@mui/icons-material";
import {
  SlidersHorizontal,
  PenLine,
  PlayCircle,
  PauseCircle,
  RefreshCw,
} from "lucide-react";
import { useApi } from "../../api/useApi";

import { Switch, Tooltip, Fade } from "@mui/material";

import dayjs from "dayjs";

export default function RuleDashboard() {
  const { loading, error, get, post, put, del } = useApi();
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleToggle = (rule) => {
    const updated = { ...rule, isActive: !rule.isActive };

    console.log("Toggled:", updated);

    // Update state lokal agar UI langsung berubah
    setRules((prev) =>
      prev.map((r) =>
        r.rule_id === rule.rule_id ? { ...r, isActive: !r.isActive } : r
      )
    );
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await get("/rule-configs/", {
          skip: page,
          limit: limit,
        });

        setRules(
          data.data.map((rule) => ({
            ...rule,
            isActive: true, // default semua OFF
          }))
        );
        console.log(rules);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransaction();
  }, []);

  const handleEdit = (rule) => {
    setSelectedRule({ ...rule });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRule(null);
  };

  const handleSave = async () => {
    setRules((prev) =>
      prev.map((r) => (r.rule_id === selectedRule.rule_id ? selectedRule : r))
    );
    await put(`/rule-configs/${selectedRule.rule_id}`, selectedRule);
    handleClose();

    //! error belum di handle
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRule((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f8f8f8, #efefef)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{
          mb: 0.5,
          fontFamily: "'Inter', sans-serif",
          color: "#172554",
          letterSpacing: "0.3px",
        }}
      >
        FDS Rules
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          mb: 3,
          color: "#64748b", // abu-abu lembut
          fontFamily: "'Inter', sans-serif",
          maxWidth: 600,
          lineHeight: 1.5,
        }}
      >
        View, edit, and manage FDS rules.
      </Typography>

      {/* <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 1,
          alignItems: "stretch",
        }}
      >
        {rules?.map((rule) => {
          const isActive = !!rule.is_active;
          return (
            <Card
              onClick={() => handleEdit(rule)}
              key={rule.rule_id}
              elevation={0}
              sx={{
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                backgroundColor: "#fff",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.25s ease-in-out",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 22px rgba(37,99,235,0.12)",
                },

                // gradient line bawah card
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "4px",
                  background:
                    "linear-gradient(270deg, #06B6D4, #3B82F6, #2563EB, #06B6D4)",
                  backgroundSize: "400% 400%",
                  animation: "moveGradient 6s ease infinite",
                },
                "@keyframes moveGradient": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "50%": { backgroundPosition: "100% 50%" },
                  "100%": { backgroundPosition: "0% 50%" },
                },

                // efek glow halus biru di bawah card
                "&::before": {
                  content: '""',
                  position: "absolute",
                  bottom: "-10px",
                  left: "15%",
                  width: "70%",
                  height: "15px",
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.25), transparent 70%)",
                  filter: "blur(10px)",
                },
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <SlidersHorizontal
                      size={16}
                      color="#2563EB"
                      strokeWidth={2}
                    />
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      sx={{ color: "#1E293B" }}
                    >
                      {rule.rule_name}
                    </Typography>
                    <Tooltip
                      title={
                        isActive
                          ? "Click to deactivate this rule"
                          : "Click to activate this rule"
                      }
                      arrow
                      placement="top"
                    >
                      <Switch
                        checked={isActive}
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation(); // biar nggak ikut trigger handleEdit
                          handleToggle(rule);
                        }}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#172554",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#172554",
                            },
                          "& .MuiSwitch-track": {
                            borderRadius: "999px",
                            backgroundColor: "#e2e8f0",
                          },
                        }}
                      />
                    </Tooltip>
                  </Stack>
                </Stack>

                <Divider sx={{ mb: 1.2 }} />

                <Stack spacing={0.7} flexGrow={1}>
                  <InfoItem label="Window" value={rule.window_seconds} />
                  <InfoItem label="Max Tx" value={rule.max_tx} />
                  <InfoItem label="Max/Tx" value={rule.max_amount_per_tx} />
                  <InfoItem label="Max Amount" value={rule.max_amount} />
                  <InfoItem label="Distance" value={rule.distance} />
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box> */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 2,
          alignItems: "stretch",
        }}
      >
        {rules?.map((rule) => {
          return (
            <Fade in key={rule.rule_id} timeout={500}>
              <Card
                onClick={() => handleEdit(rule)}
                elevation={0}
                sx={{
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  // height: 200, // 🔹 semua card sama tinggi
                  backgroundColor: "#fff",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.25s ease-in-out",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 22px rgba(37,99,235,0.12)",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: rule.isActive
                      ? "linear-gradient(270deg, #3B82F6, #06B6D4, #2563EB)"
                      : "linear-gradient(270deg, #9ca3af, #d1d5db)",
                    backgroundSize: "400% 400%",
                    animation: rule.isActive
                      ? "moveGradient 6s ease infinite"
                      : "none",
                  },
                  "@keyframes moveGradient": {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                  },
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 2.2,
                    overflow: "hidden",
                  }}
                >
                  {/* ===== HEADER ===== */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ minWidth: 0 }}
                    >
                      <SlidersHorizontal
                        size={16}
                        color={rule.isActive ? "#2563EB" : "#9ca3af"}
                        strokeWidth={2}
                      />
                      <Tooltip title={rule.rule_name} placement="top" arrow>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          noWrap
                          sx={{
                            maxWidth: 150, // 🔹 batasi lebar agar tooltip muncul
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: rule.isActive ? "#1E293B" : "#9ca3af",
                            transition: "color 0.2s ease",
                            cursor: "default",
                          }}
                        >
                          {rule.rule_name}
                        </Typography>
                      </Tooltip>
                    </Stack>

                    {/* === ACTIVE SWITCH === */}
                    <Tooltip
                      title={
                        rule.isActive
                          ? "Click to deactivate this rule"
                          : "Click to activate this rule"
                      }
                      arrow
                      placement="top"
                    >
                      <Switch
                        checked={rule.isActive}
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation(); // tetap tidak ganggu handleEdit
                          handleToggle(rule);
                        }}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#172554",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#172554",
                            },
                          "& .MuiSwitch-track": {
                            borderRadius: "999px",
                            backgroundColor: "#e2e8f0",
                          },
                        }}
                      />
                    </Tooltip>
                  </Stack>

                  {/* ===== TAGS ===== */}
                  <Stack direction="row" flexWrap="wrap" gap={0.5} mb={1}>
                    {rule.tags?.length ? (
                      rule.tags.map((tag, i) => (
                        <Chip
                          key={i}
                          label={tag}
                          size="small"
                          sx={{
                            fontSize: "0.7rem",
                            height: 20,
                            backgroundColor: "#f1f5f9",
                            color: "#2563EB",
                            borderRadius: "6px",
                          }}
                        />
                      ))
                    ) : (
                      <Chip
                        label="No Tags"
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: 20,
                          backgroundColor: "#f9fafb",
                          color: "#9ca3af",
                          borderRadius: "6px",
                        }}
                      />
                    )}
                  </Stack>
                  {/* 
                  <Divider sx={{ mb: 1.2 }} />

                  <Stack spacing={0.7} flexGrow={1}>
                    <InfoItem label="Window" value={rule.window_seconds} />
                    <InfoItem label="Max Tx" value={rule.max_tx} />
                    <InfoItem label="Max/Tx" value={rule.max_amount_per_tx} />
                    <InfoItem label="Max Amount" value={rule.max_amount} />
                    <InfoItem label="Distance" value={rule.distance} />
                  </Stack> */}

                  {/* <Divider sx={{ my: 1.2 }} /> */}

                  {/* ===== STATUS FOOTER ===== */}
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    {rule.isActive ? (
                      <RefreshCw size={14} color="#22c55e" />
                    ) : (
                      <PauseCircle size={14} color="#9ca3af" />
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        color: rule.isActive ? "#22c55e" : "#9ca3af",
                        fontWeight: 500,
                      }}
                    >
                      {rule.isActive ? "Running" : "Stopped"}
                    </Typography>
                    <Tooltip
                      title={`Last updated: ${dayjs(Date.now()).format(
                        "DD MMM YYYY HH:mm:ss"
                      )}`}
                      arrow
                      placement="top"
                    >
                      <Typography
                        variant="caption"
                        color="#94a3b8"
                        sx={{ cursor: "default" }} // biar kelihatan bisa di-hover
                      >
                        {dayjs(Date.now()).format("DD MMM HH:mm")}
                      </Typography>
                    </Tooltip>
                  </Stack>
                </CardContent>
              </Card>
            </Fade>
          );
        })}
      </Box>
      {/* Dialog edit */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 3,
            p: 0,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(37,99,235,0.08)",
            backdropFilter: "blur(8px)",
            background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
            transition: "all 0.3s ease",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: "16px",
            color: "#1E293B",
            pb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            background: "linear-gradient(90deg, #F8FAFC, #EFF6FF)",
          }}
        >
          <span>
            <Box
              component="span"
              sx={{
                color: "#172554",
                fontWeight: 800,
                letterSpacing: "0.5px",
              }}
            >
              {selectedRule?.rule_name}
            </Box>
          </span>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 3,
            width: "100%",
            minWidth: 420,
            backgroundColor: "#fff",
          }}
        >
          <Stack spacing={2} sx={{ paddingTop: 2 }}>
            {[
              "window_seconds",
              "max_tx",
              "max_amount_per_tx",
              "max_amount",
              "distance",
            ].map((field) => (
              <TextField
                key={field}
                label={field.replace(/_/g, " ").toUpperCase()}
                name={field}
                type="number"
                value={selectedRule?.[field] ?? ""}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={{
                  // padding: 10,
                  "& .MuiInputBase-root": {
                    borderRadius: 2,
                    backgroundColor: "#F9FAFB",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "#F3F4F6",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#fff",
                      boxShadow: "0 0 0 2px rgba(37,99,235,0.2)",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(0,0,0,0.1)",
                  },
                  "& .MuiInputLabel-root": {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#475569",
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14.5,
                    color: "#0F172A",
                    paddingY: 1,
                  },
                }}
              />
            ))}
          </Stack>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            pt: 1,
            borderTop: "1px solid rgba(0,0,0,0.05)",
            backgroundColor: "#F8FAFC",
          }}
        >
          <Button
            onClick={handleClose}
            color="inherit"
            size="small"
            sx={{
              fontFamily: "'Inter', sans-serif",
              textTransform: "none",
              color: "#64748B",
              "&:hover": { backgroundColor: "rgba(100, 116, 139, 0.28)" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleSave}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              background: " #2563EB",
              boxShadow: "0 3px 10px rgba(37,99,235,0.2)",
              "&:hover": {
                backgroundColor: "#3B82F6",
                boxShadow: "0 4px 12px rgba(125, 161, 238, 0.05)",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function InfoItem({ label, value }) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ gap: 1 }}>
      <Typography variant="caption" color="#666">
        {label}
      </Typography>
      <Chip
        label={value ?? "-"}
        size="small"
        sx={{
          fontSize: "0.7rem",
          height: 20,
          backgroundColor: "#f4f4f4",
          color: "#333",
          minWidth: 50,
          textAlign: "center",
        }}
      />
    </Stack>
  );
}
