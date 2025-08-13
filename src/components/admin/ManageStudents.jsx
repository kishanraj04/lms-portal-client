import React, { useState, useMemo } from "react";
import { data, useParams } from "react-router-dom";
import {
  useAllowUserFromSendingTheMsgMutation,
  useGetStudentOfGroupQuery,
  useRemoveStudentFromGroupMutation,
  useStopUserFromSendingTheMsgMutation,
} from "../../store/api/groupApi";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TextField,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
function ManageStudents() {
  const { groupId } = useParams();
  const { data: groupStudents } = useGetStudentOfGroupQuery(groupId, {
    refetchOnMountOrArgChange: true,
  });

  const [searchEmail, setSearchEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newStudent, setNewStudent] = useState({ email: "", groupId: "" });
  const [stopStudentToSendMsgApi] = useStopUserFromSendingTheMsgMutation();
  const [allowToSendMessageApi] = useAllowUserFromSendingTheMsgMutation();
  const [removeStudentFromGrp, removeStuResp] =
    useRemoveStudentFromGroupMutation();
  // Directly use students array from API response
  const members = groupStudents?.students || [];

  const filteredMembers = useMemo(() => {
    return members.filter((m) =>
      m.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  }, [members, searchEmail]);

  const handleAllowToSendMsg = async (studentId, allow) => {
    try {
      const data = { studentId, groupId };
      if (!allow) {
        const resp = await stopStudentToSendMsgApi(data, {
          refetchOnMountOrArgChange: true,
        });
        if (resp?.data?.success) toast.success("now , user cant send message");
      } else {
        const resp = await allowToSendMessageApi(data, {
          refetchOnMountOrArgChange: true,
        });
        if (resp?.data?.success) toast.success("now , user can send message");
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleAddStudent = () => {
    if(!newStudent?.email || !newStudent?.groupId){
      return toast.error("all field required")
    }
    console.log(`Add student with email: ${newStudent?.groupId}`);
    // TODO: Call API to add student
    setOpenDialog(false);
    setNewStudent("");
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "#121212",
          color: "white",
          maxHeight: 400,
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            width: 0, // Chrome, Safari, Edge
            display: "none",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          p={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <TextField
            label="Search by Email"
            variant="outlined"
            size="small"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            sx={{
              flex: 1,
              input: { color: "white" },
              label: { color: "grey.400" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "grey.500" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
          />

          <Button
            variant="outlined"
            sx={{ flex: 1, height: "40px" }}
            onClick={() => setOpenDialog(true)}
          >
            Add Student
          </Button>
        </Stack>

        <Table sx={{ "& td, & th": { color: "white" } }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1e1e1e" }}>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Allow To Message</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredMembers.map((student) => (
              <TableRow
                key={student._id}
                sx={{
                  "&:hover": { backgroundColor: "#2a2a2a" },
                }}
              >
                <TableCell>
                  <Avatar
                    src={student.avatar}
                    alt={student.name}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />
                </TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {student.allowToSendMsg ? (
                    <CheckCircleIcon
                      onClick={() => handleAllowToSendMsg(student._id, false)}
                      color="success"
                      sx={{ cursor: "pointer" }}
                    />
                  ) : (
                    <CancelIcon
                      onClick={() => handleAllowToSendMsg(student._id, true)}
                      sx={{ cursor: "pointer" }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <DeleteIcon
                    sx={{
                      color: "#f44336",
                      cursor: "pointer",
                      "&:hover": { color: "#e57373" },
                    }}
                    onClick={async () => {
                      try {
                        const resp = removeStudentFromGrp({
                          groupId,
                          studentId: student?._id,
                        });
                        console.log(resp);
                      } catch (error) {
                        console.log(error?.message);
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Student Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter user email"
            type="email"
            fullWidth
            required
            value={newStudent?.email}
            onChange={(e) =>
              setNewStudent((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />

          <TextField
            autoFocus
            margin="dense"
            label="Enter GroupId"
            required
            type="text"
            fullWidth
            value={newStudent?.groupId}
            onChange={(e) =>
              setNewStudent((prev) => ({
                ...prev,
               groupId: e.target.value,
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddStudent}>
            Add Student
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ManageStudents;
