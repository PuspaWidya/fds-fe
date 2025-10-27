import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Grid,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { X, Smartphone, ShieldAlert, Clock, MapPin } from "lucide-react";

const drawerWidth = 480;

const getStatusColor = (status) => {
  switch (status) {
    case "ALERT":
      return "error";
    case "GENUINE":
      return "success";
    case "SUSPECT":
      return "warning";
    default:
      return "default";
  }
};

export default function UserDetail({ isOpen, onClose, transaction }) {
  if (!transaction) return null;

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: drawerWidth,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          backgroundColor: "#f9fafb",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ p: 3, position: "relative" }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            User Activity Detail
          </Typography>
          <Tooltip title="Close">
            <IconButton onClick={onClose} size="small">
              <X size={20} />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Basic Info */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            p: 2.5,
            mb: 2.5,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Username
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {transaction.username || "-"}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={transaction.status}
              color={getStatusColor(transaction.status)}
              size="small"
              sx={{
                fontWeight: 600,
                color: alert.status === "ALERT" ? "#c53030" : "#004b23",
              }}
            />
            {transaction.rule_names && transaction.rule_names !== "{}" && (
              <Chip
                label={transaction.rule_names.replace(/[{}"]/g, "")}
                color="warning"
                size="small"
                variant="outlined"
              />
            )}
          </Stack>
        </Box>

        {/* Detail Info */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            p: 2.5,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 1.5, color: "text.primary" }}
          >
            Activity Information
          </Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <Stack spacing={0.3}>
                <Typography variant="caption" color="text.secondary">
                  CIF Number
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {transaction.cif_number || "-"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={0.3}>
                <Typography variant="caption" color="text.secondary">
                  Activity Type
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {transaction.activity_type || "-"}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={0.3} direction="row" alignItems="center">
                <Clock size={16} color="#555" />
                <Typography variant="body2">
                  {transaction.activity_datetime || "-"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 1.5, color: "text.primary" }}
          >
            Device Information
          </Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Smartphone size={16} />
                <Typography variant="body2">
                  {transaction.device_name || "-"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={0.3}>
                <Typography variant="caption" color="text.secondary">
                  Longitude
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {transaction.device_long || "-"}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={0.3}>
                <Typography variant="caption" color="text.secondary">
                  Latitude
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {transaction.device_lat || "-"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, mb: 1.5, color: "text.primary" }}
          >
            Financial Summary
          </Typography>
          <Grid container spacing={1.5}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <ShieldAlert size={16} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Current Balance:{" "}
                  <strong>
                    {transaction.current_saldo
                      ? `Rp ${Number(transaction.current_saldo).toLocaleString(
                          "id-ID"
                        )}`
                      : "-"}
                  </strong>
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <MapPin size={16} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  IP Address: {transaction.ip_address || "-"}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
}
