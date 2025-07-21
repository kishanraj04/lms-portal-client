import React from "react";
import { Box, Typography, Container, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a237e",
        color: "#fff",
        py: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              LMS Portal
            </Typography>
            <Typography variant="body2">
              Empowering learners through structured content and collaborative tools.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="/dashboard" color="inherit" underline="hover">
                Dashboard
              </Link>
              <Link href="/courses" color="inherit" underline="hover">
                Courses
              </Link>
              <Link href="/assignments" color="inherit" underline="hover">
                Assignments
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact Us
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">Email: support@lmsportal.com</Typography>
            <Typography variant="body2">Phone: +91 98765 43210</Typography>
            <Typography variant="body2">Location: India</Typography>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} LMS Portal. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
