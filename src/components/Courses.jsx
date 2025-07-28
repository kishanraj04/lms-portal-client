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
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
const Courses = ({ course }) => {
  return (
    <Grid item>
      <Card
        elevation={2}
        sx={{
          borderRadius: 2,
          width: 300, // fixed width
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={course.thumbnail?.url}
          alt={course?.title}
        />

        <CardContent sx={{ p: 2, flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component={RouterLink}
            to={`/course/detail/${course?._id}`}
            sx={{textDecoration:"none"}}
          >
            {course?.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            {course?.subTitle}
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
        </CardContent>

        <Box
          px={2}
          pb={2}
          pt={0}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
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

          <Chip label={course?.courselevel} size="small" color="secondary" />
        </Box>
      </Card>
    </Grid>
  );
};

export default Courses;
