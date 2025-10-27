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
import { useApi } from "../../api/useApi";
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
          params: { skip: page, limit: limit },
        });
        console.log(data, "????");
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

  const handleSave = () => {
    setRules((prev) =>
      prev.map((r) => (r.rule_id === selectedRule.rule_id ? selectedRule : r))
    );
    handleClose();
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
          color: "#222",
          letterSpacing: 0.3,
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
            key={rule.rule_id}
            elevation={2}
            sx={{
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              backgroundColor: "#fff",
              transition: "all 0.15s ease-in-out",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              },
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                p: 1.5,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Stack direction="row" spacing={0.8} alignItems="center">
                  <Settings fontSize="small" sx={{ color: "#666" }} />
                  <Typography variant="subtitle2" fontWeight={600}>
                    {rule.rule_name}
                  </Typography>
                </Stack>
                <IconButton
                  onClick={() => handleEdit(rule)}
                  size="small"
                  sx={{ p: 0.3 }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Stack>

              <Divider sx={{ mb: 1 }} />

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
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 600, fontSize: "16px" }}>
          Edit Rule – {selectedRule?.rule_name}
        </DialogTitle>
        <DialogContent
          sx={{
            p: 3,
            w: 30, // ruang lebih lega
            width: "100%",
            minWidth: 420, // pastikan cukup lebar
          }}
        >
          <Stack spacing={2}>
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
                InputLabelProps={{ shrink: true }} // ⬅️ hindari label tertimpa
                size="medium" // ⬅️ biar lebih besar dan nyaman
                sx={{
                  "& .MuiInputBase-input": { fontSize: 15 },
                  "& .MuiInputLabel-root": { fontSize: 14 },
                }}
              />
            ))}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 2, pb: 2 }}>
          <Button onClick={handleClose} color="inherit" size="small">
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#444",
              "&:hover": { backgroundColor: "#222" },
            }}
            onClick={handleSave}
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
