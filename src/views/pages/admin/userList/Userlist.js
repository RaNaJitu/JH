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
import validSession from "../../../../utils/validSessionHandle";
import { useNavigate } from "react-router-dom";
import configs from "../../../../config/configuration";
import fetchUserData from "../../../../utils/userSavedData";
import {
  handleOnFetchEditData,
  handleOnEditData,
  handleonDeleteData,
} from "../../../../utils/editDataHandle";
import errorOnHandle from "../../../../utils/errorHandle";
import handleExpiredJwt from "../../../../utils/replaceExpiredJwt";
import { useParams } from "react-router-dom";

const AdminUserList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [editData, setEditData] = useState({});
  // const { id } = useParams()

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
  //         .get(`${configs.REACT_APP_BACKEND_URL}admins/${userData.accountId}/vendor/users/${id}`, {
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
  // const openEditModal = (rowData) => {
  //     setEditData(rowData);
  //     setIsEditModalOpen(true);
  // };

  // const closeEditModal = () => {
  //     setIsEditModalOpen(false);
  // };

  // const handleEditData = async () => {
  //     setIsLoading(true)
  //     const res = await handleOnFetchEditData(editData, navigate, "admin")
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
        <div className="loader">{/* <CircularProgress /> */}</div>
      ) : (
        <TableContainer component={Paper}>
          <Table className="data-table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Token</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>IP</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.account}</TableCell>
                  <TableCell>{item.token}</TableCell>
                  <TableCell>{item.balance}</TableCell>
                  <TableCell>{item.ip}</TableCell>
                  <TableCell>{item.currency}</TableCell>
                  <TableCell>{item.status ? "Active" : "Inactive"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditModal(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        handleonDeleteData(
                          item,
                          setIsLoading,
                          navigate,
                          data,
                          setData
                        )
                      }
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
              label="Account"
              variant="filled"
              fullWidth
              value={editData.account}
              onChange={(e) =>
                setEditData({ ...editData, account: e.target.value })
              }
              disabled
            />
            <TextField
              label="Token"
              variant="filled"
              fullWidth
              value={editData.token}
              onChange={(e) =>
                setEditData({ ...editData, token: e.target.value })
              }
              disabled
            />
            <TextField
              label="Balance"
              variant="filled"
              fullWidth
              value={editData.balance}
              onChange={(e) =>
                setEditData({ ...editData, balance: e.target.value })
              }
              disabled
            />
            <TextField
              label="IP"
              variant="filled"
              fullWidth
              value={editData.ip}
              onChange={(e) => setEditData({ ...editData, ip: e.target.value })}
              disabled
            />
            <TextField
              label="Currency"
              variant="filled"
              fullWidth
              value={editData.currency}
              onChange={(e) =>
                setEditData({ ...editData, currency: e.target.value })
              }
              disabled
            />
            <FormControl variant="outlined" fullWidth>
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
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button onClick={handleEditData} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminUserList;
