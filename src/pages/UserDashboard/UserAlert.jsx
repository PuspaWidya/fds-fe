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
import { useApi } from "../../../api/useApi";
import UserDetail from "./UserDetail";

export default function UserAlert() {
  const { loading, error, get, post, put, del } = useApi();
  const [userData, setUserData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleMenuOpenDrawer = (user) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleDrawerCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedUser(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await get("/accounts/alerts", {
          skip: page,
          limit: limit,
        });
        setUserData(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
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
            color: "#172554", // deep Cyclops blue
            letterSpacing: "0.3px",
          }}
        >
          User Alert
        </Typography>

        <IconButton
          sx={{
            color: "#2563EB",
            backgroundColor: "rgba(37,99,235,0.08)",
            "&:hover": {
              backgroundColor: "rgba(37,99,235,0.15)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <Bell size={18} strokeWidth={1.6} />
        </IconButton>
      </Box>

      {/* Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(37,99,235,0.08)",
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
          User Alert
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
                backgroundColor: "rgba(37,99,235,0.04)",
                transform: "translateY(-1px)",
                cursor: "pointer",
              },
            }}
          >
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
              {userData.map((alert) => (
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

                  {/* ✅ Chip tetap sesuai status */}
                  <TableCell>
                    <Chip
                      label={alert.status}
                      size="small"
                      color={getStatusColor(alert.status)}
                      sx={{
                        minWidth: 80,
                        fontWeight: 600,
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    {alert.rule_names && alert.rule_names !== "{}"
                      ? alert.rule_names.replace(/[{}"]/g, "")
                      : "-"}
                  </TableCell>
                  <TableCell>{alert.device_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Drawer */}
      <UserDetail
        isOpen={drawerOpen}
        onClose={handleDrawerCloseDrawer}
        transaction={selectedUser}
      />
    </Box>
  );
}
