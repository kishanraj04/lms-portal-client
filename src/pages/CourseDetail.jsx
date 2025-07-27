import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Paper,
} from "@mui/material";

export default function CourseDetail() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#222",
          color: "white",
          borderRadius: 2,
          p: { xs: 2, md: 3 },
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Mastering Next.js: Full-Stack Web Development
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Build Scalable, Modern Web Apps with React & Next.js
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Created By <b>Patel MernStack</b>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Last updated: 2024-10-20
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Students enrolled: 1
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          gap: 4,
        }}
      >
        {/* Right Box: Video + Price */}
        <Box sx={{ width: { xs: "100%", md: "35%" } }}>
          <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
            <CardMedia
              component="video"
              controls
              src="/preview.mp4" // Replace with actual video path
              sx={{ height: 200 }}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                Introduction to Next.js
              </Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>
                239₹
              </Typography>
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
                Buy Course Now
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Left Box: Description + Course Content */}
        <Box
          sx={{
            backgroundColor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 2,
            width: { xs: "100%", md: "65%" },
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Description
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            This comprehensive course is designed for developers who want to learn how to build robust,
            production-ready web applications using Next.js. You will master server-side rendering, static site
            generation, API routes, dynamic routing, and much more. By the end of this course, you will be
            able to create SEO-friendly, scalable, and fast web applications with ease.
          </Typography>

          <Paper elevation={1} sx={{ p: 2, borderRadius: 2, backgroundColor: "#fafafa" }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Course Content
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              4 lectures
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body2">▶ Introduction to Next.js</Typography>
            <Typography variant="body2">▶ Setting Up Your Next.js Development Environment</Typography>
            <Typography variant="body2">▶ Routing in Next.js</Typography>
            <Typography variant="body2">▶ Server-Side Rendering (SSR) and Static Site Generation (SSG)</Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
