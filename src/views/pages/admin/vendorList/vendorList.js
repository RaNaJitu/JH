import React, { useEffect, useState } from 'react';
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
    InputAdornment,
    IconButton,
    Pagination
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';
import validSession from '../../../../utils/validSessionHandle';
import { useNavigate } from 'react-router-dom';
import configs from '../../../../config/configuration';
import fetchUserData from '../../../../utils/userSavedData';
import { handleOnEditData, handleonVendorDeleteData } from '../../../../utils/editDataHandle';
import errorOnHandle from '../../../../utils/errorHandle';
import handleExpiredJwt from '../../../../utils/replaceExpiredJwt';
import { handleOnFetchEditVendorData } from '../../../../utils/admin/editVendorHandle';



const AdminVendorList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);
    const [totalVendors, setTotalVendors] = useState(0);


    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const userData = fetchUserData();
        let navigateUrl
        if (userData?.role == 'vendor')
            navigateUrl = '/login'
        else if (userData?.role == 'admin')
            navigateUrl = '/admin/login'
        else
            return alert("Something Went Wrong . Kindly login again")

        if (!validSession())
            return navigate(navigateUrl)
        axios
            .get(`${configs.REACT_APP_BACKEND_URL}admins/${userData.accountId}/vendor`, {
                params: {
                    page: currentPage,
                    pageSize: pageSize,
                },
                headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token },
            })
            .then((response) => {
                const responseData = response.data.data;
                setData(responseData.data);
                setIsLoading(false);
                setTotalVendors(responseData.total);
                handleExpiredJwt(response);
            })
            .catch((error) => {
                setIsLoading(false);
                const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate);
                if (!errorHandler) return;
                else return alert(errorHandler.msg);
            });
    }, [currentPage, pageSize]);


    useEffect(() => {
        setSearchClicked(false)
    }, [searchQuery])

    const openEditModal = (rowData) => {
        setEditData(rowData);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditData = async () => {
        setIsLoading(true);
        const res = await handleOnFetchEditVendorData(editData, navigate);
        if (res) {
            handleExpiredJwt(res);
            const newData = handleOnEditData(res, data);
            if (newData) setData(newData);
        }
        setIsLoading(false);
        closeEditModal();
    };

    const handleSearch = () => {
        if (searchQuery != '') {
            setSearchClicked(true)
            const filtered = data.filter((item) =>

                item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.email?.toLowerCase().includes(searchQuery) ||
                item._id.includes(searchQuery) ||
                item.publicToken?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.privateToken?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.currency?.toLowerCase().includes(searchQuery.toLowerCase())

            );
            setFilteredData(filtered);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setFilteredData([]);
        setSearchClicked(false)
    };

    return (
        <div className="table-container">
            <div className="search-input">
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => navigate('/admin/createvendor')}
                >
                    New vendor
                </Button>
                <TextField
                    style={{ position: "absolute", left: "1400px" }}
                    label="Search"
                    size='small'
                    variant="filled"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                                {searchQuery && (
                                    <IconButton onClick={handleClearSearch}>
                                        Clear
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            {isLoading ? (
                <div className="loader">
                    <CircularProgress />
                </div>
            ) : (
                <TableContainer component={Paper} style={{ marginTop: "40px" }}>
                    <Table className="data-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Allowed Games</TableCell>
                                <TableCell>Restricted Games</TableCell>
                                <TableCell>Currency</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Endpoints</TableCell>
                                <TableCell>UserList</TableCell>
                                <TableCell>Edit Game List</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {((searchQuery != '' && searchClicked == true) ? filteredData : data).map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.allowed_games.join(', ')}</TableCell>
                                    <TableCell>{item.restricted_games.join(', ')}</TableCell>
                                    <TableCell>{item.currency}</TableCell>
                                    <TableCell>{item.status ? 'Active' : 'Inactive'}</TableCell>
                                    <TableCell>{JSON.stringify(item.endpoints)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => navigate(`/admin/userlist/${item._id}`)}
                                        >
                                            UserList
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant='outlined'
                                            color='primary'
                                            onClick={() => navigate(`/admin/editGameList/${item._id}?allowed_games=${encodeURIComponent(JSON.stringify(item.allowed_games))}`)}
                                        >
                                            Edit Games
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="primary" onClick={() => openEditModal(item)}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" color="secondary" onClick={() => handleonVendorDeleteData(item, setIsLoading, navigate, data, setData)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <div className="pagination-container">
                <Pagination
                    count={Math.ceil(totalVendors / pageSize)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                />
            </div>

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
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        />
                        <TextField
                            label="Email"
                            variant="filled"
                            fullWidth
                            value={editData.email}
                            onChange={(e) => setEditData({ ...editData, account: e.target.value })}
                        />
                        <TextField
                            label="Public token"
                            variant="filled"
                            fullWidth
                            value={editData.public_token}
                            onChange={(e) => setEditData({ ...editData, public_token: e.target.value })}
                            disabled
                        />
                        <TextField
                            label="Private token"
                            variant="filled"
                            fullWidth
                            value={editData.private_token}
                            onChange={(e) => setEditData({ ...editData, private_token: e.target.value })}
                            disabled
                        />
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="status-label">Currency</InputLabel>
                            <Select
                                labelId="status-label"
                                label="Currency"
                                value={editData.currency}
                                onChange={(e) => setEditData({ ...editData, currency: e.target.value })}
                            >
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="INR">INR</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="PKR">PKR</MenuItem>
                                <MenuItem value="AUD">AUD</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Endpoints"
                            variant="filled"
                            fullWidth
                            value={JSON.stringify(editData.endpoints)}
                            onChange={(e) => setEditData({ ...editData, endpoints: e.target.value })}
                            disabled
                        />
                        <FormControl variant="filled" fullWidth>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                label="Status"
                                value={editData.status ? 'Active' : 'Inactive'}
                                onChange={(e) => setEditData({ ...editData, status: e.target.value === 'Active' })}
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


export default AdminVendorList;
