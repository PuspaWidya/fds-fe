import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  Stack,
  Chip,
  Card,
  CardContent,
  Tabs,
  Tab,
} from "@mui/material";

const drawerWidth = 600;

export default function TransactionDetail({ isOpen, onClose, transaction }) {
  const [tabIndex, setTabIndex] = useState(0);

  if (!transaction) return null;

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "declined":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
          padding: 2,
        },
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Transaction Detail
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          <Tab label="General Info" />
          <Tab label="Merchant Info" />
          <Tab label="Technical Info" />
        </Tabs>

        {/* Tab Panels */}
        {tabIndex === 0 && (
          <Card sx={{ boxShadow: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Transaction ID
                  </Typography>
                  <Typography variant="body1">
                    {transaction.transaction_id}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Status / Approval
                  </Typography>
                  <Stack direction="row" spacing={1} mt={0.5}>
                    <Chip
                      label={transaction.status || "-"}
                      color={statusColor(transaction.status)}
                      size="small"
                    />
                    <Chip
                      label={transaction.approval_status || "-"}
                      color={statusColor(transaction.approval_status)}
                      size="small"
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Amount / Balance
                  </Typography>
                  <Typography variant="body1">
                    Rp {transaction.transaction_amount?.toLocaleString()}{" "}
                    (Saldo: Rp {transaction.current_saldo?.toLocaleString()})
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Card / Account
                  </Typography>
                  <Typography variant="body1">
                    {transaction.card_type} •{" "}
                    {transaction.card_number.replace(
                      /\d{12}(\d{4})/,
                      "**** **** **** $1"
                    )}
                  </Typography>
                  <Typography variant="body2">
                    Account: {transaction.account_number} (
                    {transaction.balance_source})
                  </Typography>
                  <Typography variant="body2">
                    CIF: {transaction.cif_number}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}

        {tabIndex === 1 && (
          <Card sx={{ boxShadow: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Merchant / Destination
                  </Typography>
                  <Typography variant="body1">
                    {transaction.merchant_name} ({transaction.merchant_code})
                  </Typography>
                  <Typography variant="body2">
                    Category: {transaction.merchant_category_code}
                  </Typography>
                  <Typography variant="body2">
                    Destination: {transaction.destination_account} / Bank{" "}
                    {transaction.destination_bank_code}
                  </Typography>
                  <Typography variant="body2">
                    Terminal: {transaction.terminal_id} •{" "}
                    {transaction.location_terminal}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight={500}>
                    Transaction Details
                  </Typography>
                  <Typography variant="body2">
                    Type: {transaction.transaction_type} /{" "}
                    {transaction.transaction_category}
                  </Typography>
                  <Typography variant="body2">
                    Channel: {transaction.channel_code} • POS Mode:{" "}
                    {transaction.pos_entry_mode}
                  </Typography>
                  <Typography variant="body2">
                    Auth Code: {transaction.auth_response_code}
                  </Typography>
                  <Typography variant="body2">
                    Rule: {transaction.rule_names || "-"}
                  </Typography>
                  <Typography variant="body2">
                    Customer Age: {transaction.customer_age_group}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}

        {tabIndex === 2 && (
          <Card sx={{ boxShadow: 1 }}>
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="subtitle1" fontWeight={500}>
                  Technical Info
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2">
                  IP Address: {transaction.ip_address}
                </Typography>
                <Typography variant="body2">
                  Geo Location: {transaction.geo_location}
                </Typography>
                <Typography variant="body2">
                  Created At:{" "}
                  {new Date(transaction.created_at).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Transaction Time:{" "}
                  {new Date(transaction.transaction_datetime).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  Owner Code / Device: {transaction.owner_code_bank_device}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Box>
    </Drawer>
  );
}
