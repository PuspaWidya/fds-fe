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
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            color: "#172554", // deep intelligent blue
            letterSpacing: "0.3px",
          }}
        >
          Transaction Alert
        </Typography>
      </Box>

      {/* Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(37,99,235,0.08)", // subtle blue accent border
          transition: "all 0.25s ease",
          "&:hover": {
            boxShadow: "0 6px 18px rgba(37,99,235,0.08)",
            borderColor: "rgba(37,99,235,0.2)",
          },
        }}
      >
        {/* Header Bar */}
        <Typography
          variant="subtitle2"
          sx={{
            p: 2,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            color: "#1E3A8A",
            borderBottom: "1px solid rgba(37,99,235,0.08)",
            background:
              "linear-gradient(90deg, rgba(37,99,235,0.05), rgba(37,99,235,0.02))",
          }}
        >
          Incoming Alert
        </Typography>

        <TableContainer>
          <Table
            sx={{
              "& th": {
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#475569",
                backgroundColor: "#F9FAFB",
                borderBottom: "1px solid rgba(37,99,235,0.05)",
              },
              "& td": {
                fontFamily: "'Inter', sans-serif",
                fontSize: 13.5,
                color: "#1E293B",
                borderBottom: "1px solid rgba(0,0,0,0.02)",
              },
              "& tr": {
                transition: "all 0.15s ease",
              },
              "& tr:hover": {
                backgroundColor: "rgba(37,99,235,0.04)", // subtle Cyclops blue hover
                transform: "translateY(-1px)",
                cursor: "pointer",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Merchant</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Rule</TableCell>
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
                      sx={{
                        minWidth: 60,
                        fontWeight: 600,
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>

                  <TableCell>{alert.rule_names}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Detail Drawer */}
      <TransactionDetail
        isOpen={drawerOpen}
        onClose={handleDrawerClose}
        transaction={selectedTransaction}
      />
    </Box>
  );
}
