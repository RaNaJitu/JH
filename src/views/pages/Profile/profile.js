import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleOnFetchProfileData, handleOnSubmitProfileChange } from '../../../utils/profileSetting';

const Profile = () => {
    const [data, setData] = useState({ name: '', currency: '' });
    const [currencies] = useState(['USD', 'EUR', 'GBP', 'INR']);
    const [isSaving, setIsSaving] = useState(false);
    const [nameError, setNameError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        handleOnFetchProfileData(navigate, setData)

    }, []);

    const handleCurrencyChange = (newCurrency) => {
        setData((prevData) => ({ ...prevData, currency: newCurrency }));
    };

    const handleNameChange = (newName) => {
        setData((prevData) => ({ ...prevData, name: newName }));
    };

    const handleSaveChanges = (e) => {
        e.preventDefault()
        if (data.name.trim() === '') {
            setNameError('Name is required');
            return;
        }

        const updatedData = {
            name: data.name,
            currency: data.currency
        };
        setNameError('')
        setIsSaving(true);
        handleOnSubmitProfileChange(navigate, updatedData, setIsSaving)



    };

    return (
        <div className="container">
            <form>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                Name:
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{ width: '150px' }}
                                    value={data.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                />
                                <div className="text-danger">{nameError}</div>
                            </td>
                            <td>Currency:
                                <select
                                    className="form-control"
                                    style={{ width: '150px' }}
                                    value={data.currency}
                                    onChange={(e) => handleCurrencyChange(e.target.value)}
                                >
                                    {currencies.map((currency) => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleSaveChanges} className="btn btn-primary" disabled={isSaving}>
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
