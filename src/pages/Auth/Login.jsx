import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Divider,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import {
  Google,
  Visibility,
  VisibilityOff,
  Lock,
  Mail,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", { email, password });
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: { xs: "90%", md: 900 },
          borderRadius: 4,
          display: "flex",
          overflow: "hidden",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
      >
        {/* Left side - branding / info */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            px: 6,
            py: 8,
            color: "white",
            animation: "moveLine 100s linear infinite",
            "@keyframes moveLine": {
              "0%": { backgroundPosition: "0% 50%" },
              "100%": { backgroundPosition: "100% 50%" },
            },
            background:
              "linear-gradient(to bottom right, rgba(30,58,138,0.8), rgba(30,64,175,0.8))",
            backgroundImage:
              'url("https://images.unsplash.com/photo-1644088379091-d574269d422f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2786")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              color: "#c8e7ff",
              textShadow: "0 0 10px #c8e7ff, 0 0 20px #c8e7ff",
              letterSpacing: 2,
            }}
          >
            CYCLOPS
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#c8e7ff",
              //   textShadow: "0 0 10px #c8e7ff, 0 0 20px #c8e7ff",
              letterSpacing: 2,
            }}
          >
            Fraud Detection System
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              color: "#d8d8d8",
              textShadow: "0 0 10px #c8e7ff, 0 0 20px #c8e7ff",
            }}
          >
            See everything. Stop fraud before it happens.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.9,
              mt: 1,
              color: "#d8d8d8",
              textShadow: "0 0 10px #c8e7ff, 0 0 20px #c8e7ff",
            }}
          >
            Monitor, analyze, and detect suspicious activities in real time.
            Ensure security and trust in your financial ecosystem.
          </Typography>
        </Box>

        {/* Right side - login form */}
        <Box
          sx={{
            flex: 1,
            px: { xs: 4, md: 8 },
            py: { xs: 6, md: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.85)",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight={700}>
              Sign in
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back, please login to your Cyclops.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                type="email"
                placeholder="Enter your email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail sx={{ color: "black" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    color: "black",
                    "& input": { color: "black" },
                  },
                }}
                InputLabelProps={{
                  sx: { color: "black" },
                }}
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "black" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? (
                          <Visibility sx={{ color: "black" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "black" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: "black",
                    "& input": { color: "black" },
                  },
                }}
                InputLabelProps={{
                  sx: { color: "black" },
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box />
                <Link href="#" underline="hover" fontSize={14}>
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 1.4,
                  backgroundColor: "#2563eb",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                  fontSize: 16,
                  "&:hover": { backgroundColor: "#1d4ed8" },
                }}
              >
                SIGN IN
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: "black" }}
              >
                Are you new?{" "}
                <Link href="#" underline="hover" fontWeight={600}>
                  Create an Account
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
