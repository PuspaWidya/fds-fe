import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
  Badge,
  Avatar,
} from "@mui/material";
import {
  LayoutDashboard,
  Bell,
  FileText,
  Users,
  BarChart3,
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Search,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleSidebar } from "../store/sidebarSlice";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
const drawerWidth = 240;
const drawerCollapsedWidth = 70;

const routeMap = {
  // Dashboard: "/",
  Rules: "/",
  "Transaction Alert": "/transaction-alert",
  "User Alert": "/user-alert",
  // Reports: "/reports",
  // Settings: "/settings",
};

const mainMenuItems = [
  // { text: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { text: "Rules", icon: <Bell size={20} /> },
  { text: "Transaction Alert", icon: <FileText size={20} /> },
  { text: "User Alert", icon: <Users size={20} /> },
  // { text: "Reports", icon: <BarChart3 size={20} /> },
  // { text: "Settings", icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);
  const [active, setActive] = useState("Rules");

  const signOut = () => {
    localStorage.clear("token");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidth : drawerCollapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? drawerWidth : drawerCollapsedWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isOpen && (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                fontFamily: "'Poppins', 'Inter', sans-serif",
                textTransform: "uppercase",
                letterSpacing: "2px",
                background: `
                  linear-gradient(
                    90deg,
                    #0EA5E9 0%,
                    #2563EB 25%,
                    #1E40AF 50%,
                    #3B82F6 75%,
                    #0EA5E9 100%
                  )
                `,
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "subtleGradientShift 16s ease-in-out infinite",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-75%",
                  width: "50%",
                  height: "100%",
                  background:
                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent)",
                  animation: "shine 4s ease-in-out infinite",
                },
                "@keyframes gradientShift": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "50%": { backgroundPosition: "100% 50%" },
                  "100%": { backgroundPosition: "0% 50%" },
                },
                "@keyframes shine": {
                  "0%": { left: "-75%" },
                  "50%": { left: "125%" },
                  "100%": { left: "125%" },
                },
              }}
            >
              CYCLOPS
            </Typography>
          )}
          <IconButton onClick={() => dispatch(toggleSidebar())} size="small">
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </IconButton>
        </Box>

        {/* {isOpen && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 1,
                px: 1.5,
                py: 0.75,
                border: "1px solid #e0e0e0",
              }}
            >
              <Search size={18} color="#9e9e9e" />
              <Typography
                sx={{ ml: 1, fontSize: "0.875rem", color: "#9e9e9e" }}
              >
                Search
              </Typography>
              <Typography
                sx={{
                  ml: "auto",
                  fontSize: "0.75rem",
                  color: "#9e9e9e",
                  backgroundColor: "#f5f5f5",
                  px: 0.75,
                  py: 0.25,
                  borderRadius: 0.5,
                }}
              >
                ⌘ I
              </Typography>
            </Box>
          </Box>
        )} */}

        <Box sx={{ px: 2, pb: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#9e9e9e",
              fontWeight: 600,
              display: isOpen ? "block" : "none",
            }}
          >
            MAIN
          </Typography>
        </Box>

        <List sx={{ px: 1 }}>
          {mainMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                sx={{
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "#D6E4FF",
                    transition: "background-color 0.2s ease",
                  },
                  minHeight: 40,
                  justifyContent: isOpen ? "initial" : "center",
                  backgroundColor: active == item.text ? "#e3f2fd" : "",
                }}
                onClick={() => {
                  navigate(routeMap[item.text]);
                  setActive(item.text);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isOpen ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.badge ? (
                    <Badge badgeContent={item.badge} color="error">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>
                {isOpen && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.875rem",
                      fontWeight: item.text === "Live Alert" ? 600 : 400,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* <Divider sx={{ my: 1 }} /> */}

        {/* <Box sx={{ px: 2, pb: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: "#9e9e9e",
                fontWeight: 600,
                display: isOpen ? "block" : "none",
              }}
            >
              OFFICES
            </Typography>
          </Box> */}

        <List sx={{ px: 1, flexGrow: 1 }}>
          {/* {officeMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  sx={{
                    borderRadius: 1,
                    "&:hover": { backgroundColor: "#e3f2fd" },
                    minHeight: 40,
                    justifyContent: isOpen ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 2 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.badge ? (
                      <Badge badgeContent={item.badge} color="error">
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  {isOpen && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "0.875rem",
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            ))} */}
        </List>

        <Divider />

        <List sx={{ px: 1, py: 1 }}>
          <ListItem disablePadding onClick={signOut}>
            <ListItemButton
              sx={{
                borderRadius: 1,
                "&:hover": { backgroundColor: "#ffebee" },
                minHeight: 40,
                justifyContent: isOpen ? "initial" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 2 : "auto",
                  justifyContent: "center",
                  color: "#d32f2f",
                }}
              >
                <LogOut size={20} />
              </ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary="Sign Out"
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    color: "#d32f2f",
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>

        {/* <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: "#0288d1",
                fontSize: "0.875rem",
              }}
            >
              MD
            </Avatar>
            {isOpen && (
              <Box sx={{ ml: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontSize: "0.875rem" }}
                >
                  @MD Franklin
                </Typography>
              </Box>
            )}
          </Box> */}
      </Box>
    </Drawer>
  );
}
