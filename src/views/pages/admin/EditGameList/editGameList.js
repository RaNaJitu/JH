import React, { useState, useEffect } from 'react';
import { handleOnSubmitGameData, handleonFetchGameData } from '../../../../utils/admin/gameListHandle';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const AdminEditGameList = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const allowedGamesParam = queryParams.get('allowed_games');
    const allowedUserGames = allowedGamesParam ? JSON.parse(decodeURIComponent(allowedGamesParam)) : [];

    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [gameData, setGameData] = useState([]);

    useEffect(() => {
        handleonFetchGameData(navigate, setGames);
    }, []);

    useEffect(() => {
        if (games) {
            const initialGameStatus = games.map((game) => ({
                game,
                status: allowedUserGames.includes(game) ? 'allowed' : 'not_allowed',
            }));
            setGameData(initialGameStatus);
        }
    }, [games]);

    const handleStatusChange = (gameName, newStatus) => {
        const updatedGameData = gameData.map((game) => {
            if (game.game === gameName) {
                return { ...game, status: newStatus };
            }
            return game;
        });
        setGameData(updatedGameData);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const allowedGames = []
        gameData.forEach((game) => {
            if (game.status == 'allowed')
                allowedGames.push(game.game)
        })

        handleOnSubmitGameData(navigate, allowedGames, id);
    };

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th><b>Game</b></th>
                            <th><b>Status</b></th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameData.map((game, index) => (
                            <tr key={index}>
                                <td>{game.game}</td>
                                <td>
                                    <select
                                        className={`form-control ${game.status === 'not_allowed' ? 'text-danger' : 'text-success'}`}
                                        value={game.status}
                                        onChange={(e) => handleStatusChange(game.game, e.target.value)}
                                    >
                                        <option value="allowed">Allowed</option>
                                        <option value="not_allowed">Not Allowed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default AdminEditGameList;
