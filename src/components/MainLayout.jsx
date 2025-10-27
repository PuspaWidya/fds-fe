import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { useAppSelector } from "../store/hooks";

const drawerWidth = 10;
const drawerCollapsedWidth = 70;

export default function MainLayout({ children }) {
  const isOpen = useAppSelector((state) => state.sidebar.isOpen);

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isOpen ? `${drawerWidth}px` : `${drawerCollapsedWidth}px`,
          transition: "margin 0.3s",
          width: `calc(100% - ${
            isOpen ? drawerWidth : drawerCollapsedWidth
          }px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
