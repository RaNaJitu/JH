import React, { useState, useEffect } from 'react';
import { handleOnSubmitGameData, handleonFetchGameData } from '../../../utils/gameListHandle';
import { useNavigate } from 'react-router-dom';

const GameList = () => {
    const [gameData, setGameData] = useState({
        name: '',
        allowed_games: [],
        currency: '',
        restricted_games: [],
    });

    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        handleonFetchGameData(navigate, setGameData, setGames);
    }, []);

    const handleStatusChange = (gameName, newStatus) => {
        const updatedGames = games.map((game) => {
            if (game.name === gameName) {
                return { ...game, status: newStatus };
            }
            return game;
        });
        setGames(updatedGames);
    };

    useEffect(() => {
        games.forEach((game) => {
            if (game.status === 'not_allowed') {
                if (!gameData.restricted_games.includes(game.name)) {
                    const updatedRestrictedGames = [...gameData.restricted_games, game.name];
                    setGameData({
                        ...gameData,
                        restricted_games: updatedRestrictedGames,
                    });
                }
            } else {
                if (gameData.restricted_games.includes(game.name)) {
                    const updatedRestrictedGames = gameData.restricted_games.filter(
                        (games) => games != game.name
                    );
                    setGameData({
                        ...gameData,
                        restricted_games: updatedRestrictedGames,
                    });
                }
            }
        });
    }, [games]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleOnSubmitGameData(navigate, gameData)

    };

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Game</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => (
                            <tr key={index}>
                                <td>{game.name}</td>
                                <td>
                                    <select
                                        className={`form-control ${game.status === 'not_allowed' ? 'text-danger' : 'text-success'}`}
                                        value={game.status}
                                        onChange={(e) => handleStatusChange(game.name, e.target.value)}
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

export default GameList;
