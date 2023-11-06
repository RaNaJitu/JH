import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configs from '../../../../config/configuration';
import fetchUserData from '../../../../utils/userSavedData';
import { useNavigate } from 'react-router-dom';
import errorOnHandle from '../../../../utils/errorHandle';
import validSession from '../../../../utils/validSessionHandle';
import handleExpiredJwt from '../../../../utils/replaceExpiredJwt';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'; // Import CoreUI modal components

const AdminGameList = () => {
    const [games, setGames] = useState([]);
    const [isAddGameModalOpen, setAddGameModalOpen] = useState(false); // State to control the modal
    const [gameName, setGameName] = useState(''); // State to store the new game name
    const navigate = useNavigate();

    // Function to open the "Add New Game" modal
    const handleOpenAddGameModal = () => {
        setAddGameModalOpen(true);
    };

    // Function to close the "Add New Game" modal
    const handleCloseAddGameModal = () => {
        setAddGameModalOpen(false);
    };

    // Function to handle changes in the game name input field
    const handleGameNameChange = (e) => {
        setGameName(e.target.value);
    };

    // Function to handle adding a new game to the list
    const handleGameAdded = (newGame) => {
        setGames([...games, newGame]);
    };

    useEffect(() => {
        const userData = fetchUserData();
        let navigateUrl;

        if (userData?.role === 'vendor')
            navigateUrl = '/login';
        else if (userData?.role === 'admin')
            navigateUrl = '/admin/login';
        else
            return alert('Something Went Wrong. Kindly login again');

        if (!validSession())
            return navigate(navigateUrl);

        axios.get(`${configs.REACT_APP_BACKEND_URL}admins/${userData.accountId}/games`, {
            headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
        })
            .then((res) => {
                handleExpiredJwt(res);
                if (res.status === 200) {
                    setGames(res.data.data);
                }
            })
            .catch((error) => {
                const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate);
                if (!errorHandler) return;
                else return alert(errorHandler.msg);
            });
    }, [navigate]);

    // Function to handle submitting the new game
    const handleSubmit = () => {
        axios
            .post('YOUR_API_ENDPOINT_HERE', { gameName })
            .then((res) => {
                // Handle response, maybe show a success message or handle errors
                if (res.status === 200) {
                    // If successful, close the modal and update the game list
                    handleGameAdded(gameName);
                    setGameName(''); // Clear the input field
                    setAddGameModalOpen(false);
                }
            })
            .catch((error) => {
                // Handle errors
                console.error('Error adding game:', error);
            });
    };

    return (
        <div className="container">
            <button onClick={handleOpenAddGameModal}>Add New Game</button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Game</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game, index) => (
                        <tr key={index}>
                            <td>{game}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CModal
                show={isAddGameModalOpen} // Show/hide the modal
                onClose={handleCloseAddGameModal} // Close modal when needed
            >
                <CModalHeader closeButton>
                    <CModalTitle>Add New Game</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <input
                        type="text"
                        placeholder="Game Name"
                        value={gameName}
                        onChange={handleGameNameChange}
                    />
                </CModalBody>
                <CModalFooter>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleCloseAddGameModal}>Close</button>
                </CModalFooter>
            </CModal>
        </div>
    );
};

export default AdminGameList;
