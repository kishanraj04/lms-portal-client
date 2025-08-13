import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { useLazySearchCourseQuery } from "../store/api/courseApi";
function SearchBar({ setCourses }) {
  const [searchApi, searchResp] = useLazySearchCourseQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const handleSearch = async () => {
    console.log(query);
    const resp = await searchApi(query);
    if (resp?.data?.success) {
      setCourses(resp?.data);
    }
  };
  return (
    <>
      <Box
        mb={4}
        mt={3}
        display="flex"
        gap={2}
        flexDirection={{ sm: "row" }}
        alignItems="center"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            width: "70%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              paddingRight: "0px",
              backgroundColor: "white", // white background
              "& fieldset": {
                borderColor: "white", // white border
              },
              "&:hover fieldset": {
                borderColor: "white", // white border on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // white border on focus
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          onClick={handleSearch}
          variant="contained"
          sx={{
            borderRadius: "25px",
            padding: "10px 25px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Search
        </Button>
      </Box>
    </>
  );
}

export default SearchBar;
