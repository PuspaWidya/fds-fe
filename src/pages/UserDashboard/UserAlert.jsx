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
          params: { skip: page, limit: limit },
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          User Alert
        </Typography>
        <IconButton>
          <Bell size={20} />
        </IconButton>
      </Box>
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

                  <TableCell>
                    <Chip
                      label={alert.status}
                      size="small"
                      color={getStatusColor(alert.status)}
                      sx={{
                        minWidth: 80,
                        color: alert.status === "ALERT" ? "#c53030" : "#004b23",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {alert.rule_names && alert.rule_names !== "{}"
                      ? alert.rule_names.replace(/[{}"]/g, "")
                      : "-"}
                  </TableCell>
                  <TableCell>{alert.device_name}</TableCell>
                  {/* <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuOpen(alert);
                      }}
                    >
                      <MoreVertical size={18} />
                    </IconButton>
                  </TableCell> */}
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
        transaction={selectedUser}
      />
    </Box>
  );
}
