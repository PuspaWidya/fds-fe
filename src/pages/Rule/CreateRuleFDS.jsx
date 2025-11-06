import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Paper,
  Divider,
  Grid,
  Checkbox,
  FormGroup,
  ListSubheader,
  Fade,
} from "@mui/material";
import { AddCircleOutline, Delete, ContentCopy } from "@mui/icons-material";
import dayjs from "dayjs";

export default function CreateRuleSimpleFixed_ProfessionalBlue() {
  const primaryBlue = "#172554"; // main brand color
  const hoverBlue = "#1e3a8a"; // hover accent
  const lightGrey = "#f5f5f5";
  const borderGrey = "#e0e0e0";

  const [meta, setMeta] = useState({
    name: "",
    owner: "",
    category: "",
    priority: "Medium",
    action: "Alert",
    logic: "AND",
    isActive: true,
    effectiveDate: dayjs().format("YYYY-MM-DD"),
    expiryDate: "",
    tags: [],
  });

  const [conditions, setConditions] = useState([
    { id: Date.now(), field: "", operator: "==", value: "" },
  ]);
  const [lastSaved, setLastSaved] = useState(null);

  const ownerOptions = ["Fraud Analyst", "Fraud Ops", "Risk Manager", "Admin"];
  const categoryOptions = [
    "Login",
    "Payment",
    "Device",
    "KYC",
    "Security",
    "Transaction",
  ];
  const tagOptions = ["Login", "Payment", "Device", "IP", "Fraud", "Profile"];

  const fieldOptions = [
    {
      label: "User Info",
      fields: [
        { key: "user_id", label: "User ID", type: "string" },
        { key: "user_country", label: "User Country", type: "string" },
      ],
    },
    {
      label: "Device Info",
      fields: [
        { key: "device_type", label: "Device Type", type: "string" },
        { key: "ip_address", label: "IP Address", type: "string" },
        { key: "device_trust", label: "Device Trust Score", type: "number" },
        { key: "distance", label: "Device Distance (km)", type: "number" },
      ],
    },
    {
      label: "Transaction Info",
      fields: [
        { key: "amount", label: "Transaction Amount", type: "number" },
        { key: "window_seconds", label: "Window Seconds", type: "number" },
        { key: "max_tx", label: "Max Transactions", type: "number" },
        {
          key: "max_amount_per_tx",
          label: "Max Amount Per Transaction",
          type: "number",
        },
        { key: "max_amount", label: "Max Total Amount", type: "number" },
        { key: "txn_country", label: "Transaction Country", type: "string" },
        {
          key: "txn_count_24h",
          label: "Transaction Count (24H)",
          type: "number",
        },
      ],
    },
    {
      label: "Rule Metadata",
      fields: [
        { key: "rule_name", label: "Rule Name", type: "string" },
        { key: "rule_id", label: "Rule ID", type: "number" },
      ],
    },
  ];

  const getOperators = (type) =>
    type === "number"
      ? [">", "<", ">=", "<=", "==", "!="]
      : ["==", "!=", "contains", "in"];

  const updateCondition = (id, key, value) => {
    setConditions((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;

        if (key === "field") {
          const fObj = fieldOptions
            .flatMap((g) => g.fields)
            .find((f) => f.key === value);

          if (!fObj) return c; // kalau gak ketemu, jangan ubah

          const fType = fObj.type || "string";
          return {
            ...c,
            field: value,
            operator: getOperators(fType)[0],
            value: "", // reset nilai
          };
        }

        return { ...c, [key]: value };
      })
    );
  };

  const addCondition = () => {
    setConditions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), field: "", operator: "==", value: "" },
    ]);
  };

  const removeCondition = (id) =>
    setConditions(conditions.filter((c) => c.id !== id));

  const handleSave = (activate = false) => {
    const payload = { ...meta, isActive: activate, conditions };
    console.log("Saving rule:", payload);
    setLastSaved(dayjs().format("HH:mm:ss"));
    alert(activate ? "✅ Rule Activated" : " Rule Saved as Draft");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      JSON.stringify({ ...meta, conditions }, null, 2)
    );
    alert("Copied JSON to clipboard!");
  };

  const expression = conditions
    .filter((c) => c.field && c.value)
    .map((c) => `${c.field} ${c.operator} "${c.value}"`)
    .join(` ${meta.logic} `);

  const isValid =
    meta.name &&
    meta.owner &&
    meta.category &&
    conditions.every((c) => c.field && c.value);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        py: 6,
      }}
    >
      <Fade in timeout={700}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 1100,
            mx: "auto",
            borderRadius: 4,
            border: `1px solid ${borderGrey}`,
            background: "#fff",
            boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                color: primaryBlue,
                letterSpacing: 0.2,
              }}
            >
              Rule Builder
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#607d8b",
                mt: 0.5,
                fontSize: 14,
              }}
            >
              Create, configure, and activate fraud detection rules dynamically.
            </Typography>
          </Box>

          {/* Active/Inactive Banner */}

          {/* Metadata */}
          <Grid container spacing={2} alignItems="center">
            {/* === Row 1: Rule Name, Owner, Category, Dates === */}
            <Grid item xs={12} md={3}>
              <TextField
                label="Rule Name"
                fullWidth
                value={meta.name}
                onChange={(e) => setMeta({ ...meta, name: e.target.value })}
                sx={{ "& .MuiOutlinedInput-root": { height: 56 } }}
              />
            </Grid>

            <Grid item xs={12} md={2.5}>
              <TextField
                select
                label="Owner"
                fullWidth
                value={meta.owner}
                onChange={(e) => setMeta({ ...meta, owner: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": { height: 56 },
                  minWidth: 150,
                }}
              >
                {ownerOptions.map((o) => (
                  <MenuItem key={o} value={o}>
                    {o}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={2.5}>
              <TextField
                select
                label="Category"
                fullWidth
                value={meta.category}
                onChange={(e) => setMeta({ ...meta, category: e.target.value })}
                sx={{
                  "& .MuiOutlinedInput-root": { height: 56 },
                  minWidth: 150,
                }}
              >
                {categoryOptions.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center" mt={2}>
            {/* === Row 1: Rule Name, Owner, Category, Dates === */}

            <Grid item xs={12} md={2.5}>
              <TextField
                type="date"
                label="Effective Date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={meta.effectiveDate}
                onChange={(e) =>
                  setMeta({ ...meta, effectiveDate: e.target.value })
                }
                sx={{ "& .MuiOutlinedInput-root": { height: 56 } }}
              />
            </Grid>

            <Grid item xs={12} md={3.5}>
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  type="date"
                  label="Expiry Date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  disabled={meta.runIndefinitely}
                  value={meta.expiryDate}
                  onChange={(e) =>
                    setMeta({ ...meta, expiryDate: e.target.value })
                  }
                  sx={{ "& .MuiOutlinedInput-root": { height: 56 } }}
                />

                {/* Switch kecil di kanan expiry */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    minWidth: 160,
                  }}
                >
                  <Switch
                    checked={meta.runIndefinitely}
                    onChange={(e) =>
                      setMeta({ ...meta, runIndefinitely: e.target.checked })
                    }
                    size="small"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#172554",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#172554",
                        },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: meta.runIndefinitely ? "#172554" : "#9e9e9e",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Run indefinitely
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={meta.priority}
                  label="Priority"
                  onChange={(e) =>
                    setMeta({ ...meta, priority: e.target.value })
                  }
                >
                  {["Low", "Medium", "High", "Critical"].map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Action</InputLabel>
                <Select
                  value={meta.action}
                  label="Action"
                  onChange={(e) => setMeta({ ...meta, action: e.target.value })}
                >
                  {["Alert", "Block", "Review", "Escalate"].map((a) => (
                    <MenuItem key={a} value={a}>
                      {a}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1.5,
                  borderRadius: 2,
                  background: meta.isActive ? "#f0f4ff" : "#fafafa",
                  border: `1px solid ${meta.isActive ? "#c7d2fe" : "#e0e0e0"}`,
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Typography
                  sx={{
                    color: meta.isActive ? "#172554" : "#9e9e9e",
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  {meta.isActive ? "Rule Active" : "Rule Inactive"}
                </Typography>

                <Switch
                  checked={meta.isActive}
                  onChange={(e) =>
                    setMeta({ ...meta, isActive: e.target.checked })
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#172554",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#172554",
                    },
                  }}
                />
              </Paper>
            </Grid> */}

            {/* <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Global Logic</InputLabel>
                <Select
                  value={meta.logic}
                  label="Logic"
                  onChange={(e) => setMeta({ ...meta, logic: e.target.value })}
                >
                  <MenuItem value="AND">AND</MenuItem>
                  <MenuItem value="OR">OR</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Conditions */}
          <Typography
            variant="h6"
            fontWeight="600"
            sx={{ color: primaryBlue, mb: 1 }}
          >
            Conditions ({meta.logic})
          </Typography>

          {conditions.map((c) => {
            const fObj = fieldOptions
              .flatMap((g) => g.fields)
              .find((f) => f.key === c.field);
            const fType = fObj?.type || "string";

            return (
              <Box
                key={c.id}
                display="flex"
                alignItems="center"
                gap={2}
                flexWrap="wrap"
                mb={1.5}
                p={1.5}
                sx={{
                  borderRadius: 2,
                  background: lightGrey,
                  border: `1px solid ${borderGrey}`,
                  "&:hover": { background: "#eeeeee" },
                }}
              >
                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel>Field</InputLabel>
                  <Select
                    value={c.field || ""}
                    label="Field"
                    onChange={(e) =>
                      updateCondition(c.id, "field", e.target.value)
                    }
                  >
                    {fieldOptions.flatMap((group) => [
                      <ListSubheader key={`${group.label}-header`}>
                        {group.label}
                      </ListSubheader>,
                      ...group.fields.map((f) => (
                        <MenuItem key={f.key} value={f.key}>
                          {f.label}
                        </MenuItem>
                      )),
                    ])}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 110 }}>
                  <InputLabel>Operator</InputLabel>
                  <Select
                    value={c.operator}
                    label="Operator"
                    onChange={(e) =>
                      updateCondition(c.id, "operator", e.target.value)
                    }
                  >
                    {getOperators(fType).map((op) => (
                      <MenuItem key={op} value={op}>
                        {op}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Value"
                  size="small"
                  type={fType === "number" ? "number" : "text"}
                  value={c.value}
                  onChange={(e) =>
                    updateCondition(c.id, "value", e.target.value)
                  }
                />

                <IconButton color="error" onClick={() => removeCondition(c.id)}>
                  <Delete />
                </IconButton>
              </Box>
            );
          })}

          <Button
            variant="outlined"
            startIcon={<AddCircleOutline />}
            onClick={addCondition}
            sx={{
              mb: 2,
              borderColor: primaryBlue,
              color: primaryBlue,
              "&:hover": { backgroundColor: "#e8eaf6" },
            }}
          >
            Add Condition
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Preview */}
          <Typography variant="h6" fontWeight="600" sx={{ color: primaryBlue }}>
            Expression Preview
          </Typography>
          <Paper sx={{ p: 2, background: "#fafafa", fontFamily: "monospace" }}>
            {expression || "No conditions yet"}
          </Paper>

          <Typography variant="h6" sx={{ mt: 3, color: primaryBlue }}>
            JSON Preview
          </Typography>
          <Box
            sx={{
              background: "#fafafa",
              borderRadius: 2,
              p: 2,
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              fontSize: 14,
              border: `1px solid ${borderGrey}`,
              position: "relative",
            }}
          >
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: primaryBlue,
              }}
            >
              <ContentCopy fontSize="small" />
            </IconButton>
            {JSON.stringify({ ...meta, conditions }, null, 2)}
          </Box>

          <Box display="flex" gap={2} mt={4}>
            <Button
              variant="outlined"
              onClick={() => handleSave(false)}
              sx={{
                borderColor: primaryBlue,
                color: primaryBlue,
                "&:hover": { backgroundColor: "#e8eaf6" },
              }}
            >
              Save Draft
            </Button>
            <Button
              variant="contained"
              disabled={!isValid}
              onClick={() => handleSave(true)}
              sx={{
                fontWeight: "bold",
                backgroundColor: primaryBlue,
                "&:hover": { backgroundColor: hoverBlue },
              }}
            >
              Save & Activate
            </Button>
          </Box>

          {lastSaved && (
            <Typography variant="caption" color="text.secondary" mt={1}>
              Last saved at {lastSaved}
            </Typography>
          )}
        </Paper>
      </Fade>
    </Box>
  );
}
