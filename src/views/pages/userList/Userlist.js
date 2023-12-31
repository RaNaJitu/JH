import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import validSession from "../../../utils/validSessionHandle";
import { useNavigate } from "react-router-dom";
import configs from "../../../config/configuration";
import fetchUserData from "../../../utils/userSavedData";
import {
  handleOnFetchEditData,
  handleOnEditData,
  handleonDeleteData,
} from "../../../utils/editDataHandle";
import errorOnHandle from "../../../utils/errorHandle";
import handleExpiredJwt from "../../../utils/replaceExpiredJwt";
import thanaList from "../../../thanaList";

const UserList = () => {
  const data = thanaList;
  console.log(data);
  //   const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  // useEffect(() => {

  //     const userData = fetchUserData();
  //     let navigateUrl
  //     if (userData?.role == 'vendor')
  //         navigateUrl = '/login'
  //     else if (userData?.role == 'admin')
  //         navigateUrl = '/admin/login'
  //     else
  //         return alert("Something Went Wrong . Kindly login again")

  //     if (!validSession())
  //         return navigate(navigateUrl)

  //     axios
  //         .get(`${configs.REACT_APP_BACKEND_URL}users/${userData.accountId}/users`, {
  //             headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token },
  //         })
  //         .then((response) => {
  //             setData(response.data.data);
  //             setIsLoading(false);
  //             handleExpiredJwt(response)
  //         })
  //         .catch((error) => {
  //             setIsLoading(false);
  //             const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
  //             if (!errorHandler)
  //                 return
  //             else
  //                 return alert(errorHandler.msg)

  //         });
  // }, []);
  const openEditModal = (rowData) => {
    setEditData(rowData);
    setIsEditModalOpen(true);
  };
  const openAddModal = (rowData) => {
    // setEditData(rowData);
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // const handleEditData = async () => {
  //     setIsLoading(true)
  //     const res = await handleOnFetchEditData(editData, navigate, "vendor")
  //     if (res) {
  //         handleExpiredJwt(res)
  //         const newData = handleOnEditData(res, data)
  //         if (newData)
  //             setData(newData)
  //     }
  //     setIsLoading(false)
  //     closeEditModal();
  // };

  return (
    <div className="table-container">
      {isLoading ? (
        <div className="loader">
          {/* <CircularProgress /> */}
          <Button>ADD</Button>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Button
            style={{ position: "relative", left: "20px", top: "10px" }}
            variant="outlined"
            color="warning"
            onClick={() => openAddModal()}
          >
            ADD
          </Button>
          <Table className="data-table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Case NO</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Thana Name</TableCell>
                <TableCell>No Of Case</TableCell>
                <TableCell>Case Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.s_No}</TableCell>
                  <TableCell>{item.Case_NO}</TableCell>
                  <TableCell>{item.contact_No}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.No_Of_Case}</TableCell>
                  <TableCell>{item.Case_Type}</TableCell>
                  {/* <TableCell>{item.status ? "Active" : "Inactive"}</TableCell> */}
                  <TableCell>
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      //   onClick={() =>
                      //     handleonDeleteData(
                      //       item,
                      //       setIsLoading,
                      //       navigate,
                      //       data,
                      //       setData
                      //     )
                      //   }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Add button */}
      <Dialog open={isAddModalOpen} onClose={closeAddModal}>
        <DialogTitle>Add Data</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="CASE NO"
              variant="filled"
              fullWidth
              //   value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <TextField
              label="THANA NAME"
              variant="filled"
              fullWidth
              //   value={editData.account}
              onChange={(e) =>
                setEditData({ ...editData, account: e.target.value })
              }
            />
            <TextField
              label="No OF CASE"
              variant="filled"
              fullWidth
              //   value={editData.token}
              onChange={(e) =>
                setEditData({ ...editData, token: e.target.value })
              }
            />
            <TextField
              label="CASE TYPE"
              variant="filled"
              fullWidth
              //   value={editData.balance}
              onChange={(e) =>
                setEditData({ ...editData, balance: e.target.value })
              }
            />
            <TextField
              label="CONTACT NO"
              variant="filled"
              fullWidth
              //   value={editData.ip}
              onChange={(e) => setEditData({ ...editData, ip: e.target.value })}
            />
          </form>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={closeEditModal}>Cancel</Button> */}
          <Button
            // onClick={handleEditData}
            variant="outlined"
            color="warning"
            style={{ position: "relative", right: "20px" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onClose={closeEditModal}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
            <TextField
              label="CASE NO"
              variant="filled"
              fullWidth
              value={editData.Case_NO}
              onChange={(e) =>
                setEditData({ ...editData, account: e.target.value })
              }
            />
            <TextField
              label="NO OF CASE"
              variant="filled"
              fullWidth
              value={editData.No_Of_Case}
              onChange={(e) =>
                setEditData({ ...editData, token: e.target.value })
              }
            />
            <TextField
              label="CASE TYPE"
              variant="filled"
              fullWidth
              value={editData.Case_Type}
              onChange={(e) =>
                setEditData({ ...editData, balance: e.target.value })
              }
            />
            <TextField
              label="CONTACT NO"
              variant="filled"
              fullWidth
              value={editData.contact_No}
              onChange={(e) => setEditData({ ...editData, ip: e.target.value })}
            />
            {/* <FormControl variant="outlined" fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                value={editData.status ? "Active" : "Inactive"}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    status: e.target.value === "Active",
                  })
                }
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl> */}
          </form>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={closeEditModal}>Cancel</Button> */}
          <Button
            //   onClick={handleEditData}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserList;
