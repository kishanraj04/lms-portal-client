import React from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  Link,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const PdfResourceList = ({ resources }) => {
  if (!resources || resources.length === 0) {
    return (
      <Typography color="text.secondary" textAlign="center">
        No resources available.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {resources.map((item, index) => {
        const lectureId = item.lectureId;
        const files = item.resources || [];

        return files
          .filter(file => file.url && file.url.endsWith(".pdf"))
          .map((file, fileIndex) => {
            const fileName = decodeURIComponent(file.url.split("/").pop());

            return (
              <Paper
                key={`${item._id}-${file._id || fileIndex}`}
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <PictureAsPdfIcon sx={{ color: "#f44336", fontSize: 40 }} />
                  <Box flexGrow={1}>
                    <Typography variant="subtitle1">{fileName}</Typography>
                    <Typography variant="body2" color="gray">
                      Lecture ID: {lectureId}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    color="info"
                    endIcon={<OpenInNewIcon />}
                    component={Link}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </Button>
                </Stack>
              </Paper>
            );
          });
      })}
    </Stack>
  );
};

export default PdfResourceList;
