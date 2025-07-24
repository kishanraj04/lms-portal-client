import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";

const Courses = ({ course }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardMedia
          component="img"
          height="180"
          image={course.thumbnail?.url}
          alt={course?.title}
        />
        <CardContent sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {course?.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {course?.description}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
            <Typography variant="subtitle1" color="primary">
              ₹{Number(course?.price) - Number(course?.discountPrice)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ₹{course?.price}
            </Typography>
            <Chip
              label={`Save ₹${Number(course?.discountPrice)}`}
              size="small"
              color="success"
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            mt={2}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                src={course?.creator?.avatar}
                alt={course?.creator?.name}
                sx={{ width: 28, height: 28 }}
              />
              <Typography variant="caption" color="text.secondary">
                {course?.creator?.name}
              </Typography>
            </Box>

            <Chip
              label={course?.courselevel}
              size="small"
              color="secondary"
            />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Courses;
