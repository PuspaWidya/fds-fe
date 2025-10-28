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
import { SlidersHorizontal, PenLine } from "lucide-react";
import { useApi } from "../../../api/useApi";
const initialRules = [
  {
    rule_name: "Velocity Rule",
    window_seconds: 60,
    max_tx: 3,
    max_amount_per_tx: null,
    max_amount: 10000000,
    distance: null,
    rule_id: 1,
  },
  {
    rule_name: "Impossible Travel Rule",
    window_seconds: 60,
    max_tx: null,
    max_amount_per_tx: null,
    max_amount: null,
    distance: 50,
    rule_id: 2,
  },
  {
    rule_name: "Geo Limit Rule",
    window_seconds: 120,
    max_tx: 5,
    max_amount_per_tx: 2000000,
    max_amount: 5000000,
    distance: 100,
    rule_id: 3,
  },
];

export default function RuleDashboard() {
  const { loading, error, get, post, put, del } = useApi();
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await get("/rule-configs/", {
          skip: page,
          limit: limit,
        });

        setRules(data.data);
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
          mb: 3,
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          color: "#172554",
          letterSpacing: "0.3px",
        }}
      >
        FDS Rules
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 1,
          alignItems: "stretch",
        }}
      >
        {rules?.map((rule) => (
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
                </Stack>

                {/* <IconButton
                  onClick={() => handleEdit(rule)}
                  size="small"
                  sx={{
                    p: 0.4,
                    color: "#3B82F6",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(59,130,246,0.08)",
                    },
                  }}
                >
                  <PenLine size={15} strokeWidth={1.7} />
                </IconButton> */}
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
        ))}
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
