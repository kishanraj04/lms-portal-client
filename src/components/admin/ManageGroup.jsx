import React from "react";
import { useAddStudentInGroupMutation, useGetMyGroupQuery } from "../../store/api/groupApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";

function ManageGroup() {
  const { data: myGroup } = useGetMyGroupQuery();
  
  const navigate = useNavigate()
  if (!myGroup?.group) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#1e1e1e", // dark background
        color: "#fff", // text color white
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#2c2c2c" }}>
          <TableRow>
            <TableCell sx={{ color: "#fff" }}>Group Id</TableCell>
            <TableCell sx={{ color: "#fff" }}>Thumbnail</TableCell>
            <TableCell sx={{ color: "#fff" }}>Group Name</TableCell>
            <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {myGroup.group.map((grp) => (
            <TableRow
              key={grp._id}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: "#252525" },
                "&:nth-of-type(even)": { backgroundColor: "#1e1e1e" },
              }}
            >
               <TableCell sx={{ color: "#fff" }}>{grp?._id}</TableCell>
              <TableCell>
                <Avatar
                  variant="square"
                  src={grp?.course?.thumbnail?.url}
                  alt={grp?.name}
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1,
                    objectFit: "cover",
                    bgcolor: "grey.800",
                    boxShadow: 1,
                  }}
                />
              </TableCell>

              <TableCell sx={{ color: "#fff" }}>{grp?.name}</TableCell>

              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<GroupIcon />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                  onClick={() => {
                    navigate(`manage-students/${grp?._id}`)
                    console.log(`Manage students for ${grp?.name}`);
                  }}
                >
                  Manage Students
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ManageGroup;
