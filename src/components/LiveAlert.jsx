import React, { useState } from 'react';
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
} from '@mui/material';
import { MoreVertical, Bell, X } from 'lucide-react';

const alertsData = [
  { id: '1', time: '10:26 PM', severity: 78, account: '#267162452', type: 'Phishing', location: 'London, UK' },
  { id: '2', time: '10:33 PM', severity: 90, account: '#267162452', type: 'Wire Transfer', location: 'London, UK' },
  { id: '3', time: '2:44 PM', severity: 29, account: '#027272863', type: 'Card Skimming', location: 'Lagos, Nigeria' },
  { id: '4', time: '10:26 PM', severity: 62, account: '#027637293', type: 'Account Takeover', location: 'Arkansas, USA' },
  { id: '5', time: '11:11 PM', severity: 21, account: '#267162452', type: 'Wire Transfer', location: 'Tokyo, Japan' },
  { id: '6', time: '9:23 PM', severity: 43, account: '#132427653', type: 'Credit Card Fraud', location: 'Tokyo, Japan' },
  { id: '7', time: '2:43 AM', severity: 54, account: '#267162452', type: 'Wire Transfer', location: 'Cape Town, South Africa' },
  { id: '8', time: '7:32 AM', severity: 32, account: '#592763823', type: 'Card Skimming', location: 'New York, USA' },
  { id: '9', time: '10:26 AM', severity: 63, account: '#592763823', type: 'Account Takeover', location: 'Lagos, Nigeria' },
  { id: '10', time: '12:26 AM', severity: 83, account: '#592763823', type: 'Card Skimming', location: 'New York, USA' },
  { id: '11', time: '7:32 AM', severity: 63, account: '#592763823', type: 'Phishing', location: 'Tokyo, Japan' },
  { id: '12', time: '7:32 AM', severity: 63, account: '#592763823', type: 'Card Skimming', location: 'New York, USA' },
  { id: '13', time: '7:32 AM', severity: 81, account: '#592763823', type: 'Account Takeover', location: 'Cape Town, South Africa' },
];

function getSeverityColor(severity) {
  if (severity >= 80) return 'error';
  if (severity >= 60) return 'warning';
  if (severity >= 40) return 'info';
  return 'success';
}

export default function LiveAlert() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Live Alert
        </Typography>
        <IconButton aria-label="notifications">
          <Bell size={20} />
        </IconButton>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Severity Colours
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 20, backgroundColor: '#d32f2f', borderRadius: 1 }} />
            <Typography variant="body2">Serious Financial Impact</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 20, backgroundColor: '#ed6c02', borderRadius: 1 }} />
            <Typography variant="body2">Mild Financial Impact</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 4, height: 20, backgroundColor: '#0288d1', borderRadius: 1 }} />
            <Typography variant="body2">Low Financial Impact</Typography>
          </Box>
        </Box>
      </Box>

      <Alert
        severity="warning"
        icon={false}
        sx={{ mb: 3, backgroundColor: '#fff3cd', color: '#856404' }}
        action={
          <IconButton size="small" color="inherit" aria-label="dismiss-alert">
            <X size={16} />
          </IconButton>
        }
      >
        <Typography variant="body2">
          <strong>10:33PM</strong> Incoming Alert: Suspicious activity going on with Account #2572881662, Name: Benjamin Franklin from IP Address: 929.0.133.591.
        </Typography>
      </Alert>

      <Paper sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ p: 2, fontWeight: 600 }}>
          Incoming Alert
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Location</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {alertsData.map((alert) => (
                <TableRow key={alert.id} hover>
                  <TableCell>{alert.time}</TableCell>
                  <TableCell>
                    <Chip label={`${alert.severity}%`} size="small" color={getSeverityColor(alert.severity)} sx={{ minWidth: 60 }} />
                  </TableCell>
                  <TableCell>{alert.account}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box
                        sx={{
                          width: 4,
                          height: 16,
                          backgroundColor: alert.severity >= 80 ? '#d32f2f' : alert.severity >= 60 ? '#ed6c02' : '#0288d1',
                          borderRadius: 1,
                        }}
                      />
                      <Typography variant="body2">{alert.type}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{alert.location}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={handleMenuOpen} aria-label="row-actions">
                      <MoreVertical size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Page {page} of 30
        </Typography>
        <Pagination count={30} page={page} onChange={(_, value) => setPage(value)} color="primary" />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small">Previous</Button>
          <Button variant="outlined" size="small">Next</Button>
        </Box>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Escalate</MenuItem>
        <MenuItem onClick={handleMenuClose}>Freeze</MenuItem>
        <MenuItem onClick={handleMenuClose}>Dismiss</MenuItem>
      </Menu>
    </Box>
  );
}
