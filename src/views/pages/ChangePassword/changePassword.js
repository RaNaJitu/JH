import React, { useState } from 'react';
import {
    CContainer,
    CCard,
    CCardBody,
    CCardHeader,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import handleOnChangePassword from '../../../utils/changePassword';
import handleExpiredJwt from '../../../utils/replaceExpiredJwt';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };
    const navigate = useNavigate();
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setNewPasswordError('New and confirm password should be same')
        } else if (newPassword.length < 8 || newPassword.length > 24) {
            setNewPasswordError('Password should be bw 8 to 24 characters')
        }
        else if (!(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/
            .test(newPassword))) {
            setNewPasswordError('Password should be alphanumeric')
        }
        else {
            const res = await handleOnChangePassword(oldPassword, newPassword, navigate, setOldPasswordError, setNewPasswordError)
            if (res) {
                handleExpiredJwt(res)
                alert(res.data.msg)
                setOldPassword('')
                setNewPassword('')
                setConfirmPassword('')

            }

        }
    };

    return (
        <CContainer style={{ display: "flex", alignItems: "center", justifyContent: "center", flexGrow: "1", width: "100%" }}>
            <CCard style={{ width: "500px" }}>
                <CCardHeader>
                    <h5>Change Password</h5>
                </CCardHeader>
                <CCardBody>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="oldPassword">Old Password</label>
                            <input
                                type="password"
                                name="oldPassword"
                                id="oldPassword"
                                className="form-control"
                                value={oldPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <span className="text-danger" style={{ "position": "relative", "top": "-20px", "left": "4px" }}>{oldPasswordError}</span>
                        <div className="mb-3">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                className="form-control"
                                value={newPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <span className="text-danger" style={{ "position": "relative", "top": "-20px", "left": "4px" }}>{newPasswordError}</span>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="form-control"
                                value={confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handlePasswordChange}
                        >
                            Change Password
                        </button>
                    </form>
                    <div className="mt-2">
                        <p className="text-secondary">
                            Ensure your new password is strong and secure.
                        </p>
                    </div>
                </CCardBody>
            </CCard>
        </CContainer>
    );
};

export default ChangePassword;
