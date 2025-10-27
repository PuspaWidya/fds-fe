/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Alert,
  Pagination,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { MoreVertical, Bell, X } from "lucide-react";
import { useApi } from "../../api/useApi";
import TransactionDetail from "./TransactionDetail";

const alertsData = [
  {
    id: "1",
    time: "10:26 PM",
    severity: 78,
    account: "#267162452",
    type: "Phishing",
    location: "London, UK",
  },
  {
    id: "2",
    time: "10:33 PM",
    severity: 90,
    account: "#267162452",
    type: "Wire Transfer",
    location: "London, UK",
  },
  {
    id: "3",
    time: "2:44 PM",
    severity: 29,
    account: "#027272863",
    type: "Card Skimming",
    location: "Lagos, Nigeria",
  },
  {
    id: "4",
    time: "10:26 PM",
    severity: 62,
    account: "#027637293",
    type: "Account Takeover",
    location: "Arkansas, USA",
  },
  {
    id: "5",
    time: "11:11 PM",
    severity: 21,
    account: "#267162452",
    type: "Wire Transfer",
    location: "Tokyo, Japan",
  },
  {
    id: "6",
    time: "9:23 PM",
    severity: 43,
    account: "#132427653",
    type: "Credit Card Fraud",
    location: "Tokyo, Japan",
  },
  {
    id: "7",
    time: "2:43 AM",
    severity: 54,
    account: "#267162452",
    type: "Wire Transfer",
    location: "Cape Town, South Africa",
  },
  {
    id: "8",
    time: "7:32 AM",
    severity: 32,
    account: "#592763823",
    type: "Card Skimming",
    location: "New York, USA",
  },
  {
    id: "9",
    time: "10:26 AM",
    severity: 63,
    account: "#592763823",
    type: "Account Takeover",
    location: "Lagos, Nigeria",
  },
  {
    id: "10",
    time: "12:26 AM",
    severity: 83,
    account: "#592763823",
    type: "Card Skimming",
    location: "New York, USA",
  },
  {
    id: "11",
    time: "7:32 AM",
    severity: 63,
    account: "#592763823",
    type: "Phishing",
    location: "Tokyo, Japan",
  },
  {
    id: "12",
    time: "7:32 AM",
    severity: 63,
    account: "#592763823",
    type: "Card Skimming",
    location: "New York, USA",
  },
  {
    id: "13",
    time: "7:32 AM",
    severity: 81,
    account: "#592763823",
    type: "Account Takeover",
    location: "Cape Town, South Africa",
  },
];

const getStatusColor = (status) => {
  if (status === "ALERT") return "error";
  // if (status === "") return "warning";
  if (status === "APPROVED") return "info";
  return "success";
};

export default function TransactionAlert() {
  const { loading, error, get, post, put, del } = useApi();
  const [transData, setTransData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleMenuOpen = (transaction) => {
    setSelectedTransaction(transaction);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedTransaction(null);
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await get("/transactions/alerts", {
          params: { skip: page, limit: limit },
        });
        setTransData(data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransaction();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Live Alert
        </Typography>
        <IconButton>
          <Bell size={20} />
        </IconButton>
      </Box>
      {/* <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Severity Colours
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 4,
                height: 20,
                backgroundColor: "red",
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">ALERT</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 4,
                height: 20,
                backgroundColor: "green",
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">GENUINE</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 4,
                height: 20,
                backgroundColor: "#0288d1",
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Low Financial Impact</Typography>
          </Box>
        </Box>
      </Box> */}
      {/* <Alert
        severity="warning"
        icon={false}
        sx={{ mb: 3, backgroundColor: "#fff3cd", color: "#856404" }}
        action={
          <IconButton size="small" color="inherit">
            <X size={16} />
          </IconButton>
        }
      >
        <Typography variant="body2">
          <strong>10:33PM</strong> Incoming Alert: Suspicious activity going on
          with Account #2572881662, Name: Benjamin Franklin from IP Address:
          929.0.133.591.
        </Typography>
      </Alert> */}
      <Paper sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ p: 2, fontWeight: 600 }}>
          Incoming Alert
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Date And Time</TableCell>
                <TableCell>Ammount</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Merchant</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Rule</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transData?.map((alert) => (
                <TableRow
                  key={alert.transaction_id}
                  hover
                  onClick={() => handleMenuOpen(alert)}
                >
                  <TableCell>{alert.transaction_id}</TableCell>
                  <TableCell>{alert.transaction_datetime}</TableCell>
                  <TableCell>{alert.transaction_amount}</TableCell>
                  <TableCell>{alert.account_number}</TableCell>
                  <TableCell>{alert.destination_account}</TableCell>
                  <TableCell>{alert.merchant_name}</TableCell>
                  <TableCell>
                    <Chip
                      label={alert.status}
                      size="small"
                      color={getStatusColor(alert.status)}
                      sx={{ minWidth: 60 }}
                    />
                  </TableCell>

                  <TableCell>{alert.rule_names}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={handleMenuOpen}>
                      <MoreVertical size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* //! PAGINATION */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Page 1 of 30
        </Typography>
        <Pagination
          count={30}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small">
            Previous
          </Button>
          <Button variant="outlined" size="small">
            Next
          </Button>
        </Box>
      </Box> */}
      {/* <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Escalate</MenuItem>
        <MenuItem onClick={handleMenuClose}>Freeze</MenuItem>
        <MenuItem onClick={handleMenuClose}>Dismiss</MenuItem>
      </Menu> */}
      <TransactionDetail
        open={drawerOpen}
        onClose={handleDrawerClose}
        transaction={selectedTransaction}
      />
    </Box>
  );
}
