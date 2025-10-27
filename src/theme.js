import { createTheme } from "@mui/material/styles";

// 🎨 Buat theme utama
const theme = createTheme({
  palette: {
    mode: "light", // bisa 'dark' juga
    primary: {
      main: "#1976d2", // biru MUI default
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#9c27b0", // ungu
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5", // warna background halaman
      paper: "#ffffff", // warna card, dialog, dsb
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h2: { fontSize: "2rem", fontWeight: 600 },
    h3: { fontSize: "1.75rem", fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 600 },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;
