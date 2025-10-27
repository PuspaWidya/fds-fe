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
import TransactionDetail from "./UserDetail";
import UserDetail from "./UserDetail";

const getStatusColor = (status) => {
  if (status === "ALERT") return "error";
  // if (status === "") return "warning";
  if (status === "APPROVED") return "info";
  return "success";
};

export default function TransactionAlert-hapus() {
  const { loading, error, get, post, put, del } = useApi();
  const [transData, setTransData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleMenuOpenDrawer = (transaction) => {
    console.log(transaction);
    setSelectedTransaction(transaction);
    setDrawerOpen(true);
  };

  const handleDrawerCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedTransaction(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await get("/accounts/alerts", {
          params: { skip: page, limit: limit },
        });
        setTransData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransaction();
  }, []);

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
          Transaction Alert
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
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>CIF</TableCell>
                <TableCell>Activity Type</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Rule</TableCell>
                <TableCell>Device</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transData.map((alert) => (
                <TableRow
                  key={alert.id}
                  hover
                  onClick={() => handleMenuOpenDrawer(alert)}
                >
                  <TableCell>{alert.id}</TableCell>
                  <TableCell>{alert.username}</TableCell>
                  <TableCell>{alert.cif_number}</TableCell>

                  <TableCell>{alert.activity_type}</TableCell>
                  <TableCell>{alert.activity_datetime}</TableCell>

                  <TableCell>
                    <Chip
                      label={alert.status}
                      size="small"
                      color={getStatusColor(alert.status)}
                      sx={{ minWidth: 80 }}
                    />
                  </TableCell>
                  <TableCell>
                    {alert.rule_names && alert.rule_names !== "{}"
                      ? alert.rule_names.replace(/[{}"]/g, "")
                      : "-"}
                  </TableCell>
                  <TableCell>{alert.device_name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuOpen(alert);
                      }}
                    >
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
      <UserDetail
        isOpen={drawerOpen}
        onClose={handleDrawerCloseDrawer}
        transaction={selectedTransaction}
      />
    </Box>
  );
}
