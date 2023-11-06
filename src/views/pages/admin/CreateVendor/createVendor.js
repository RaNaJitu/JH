import React, { useState } from 'react';
import {
    CContainer,
    CCard,
    CCardBody,
    CCardHeader,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import configs from '../../../../config/configuration';
import fetchUserData from '../../../../utils/userSavedData';
import { v4 as uuidv4 } from 'uuid';
import handleExpiredJwt from '../../../../utils/replaceExpiredJwt';
import errorOnHandle from '../../../../utils/errorHandle';
import validSession from '../../../../utils/validSessionHandle';

const AdminCreateVendor = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        public_token: '',
        private_token: '',
        ip: [],
        currency: 'USD',
        status: true,
        email: '',
        password: '',
        allowed_games: [],
        restricted_games: []
    });

    const [formErrors, setFormErrors] = useState({
        nameError: '',
        publicTokenError: '',
        privateTokenError: '',
        ipError: '',
        currencyError: '',
        emailError: '',
        passwordError: ''
    });

    const validationMessages = {
        name: 'Name is required',
        email: 'Email is required',
        password: 'Password is required',
        public_token: 'Public Token is required',
        private_token: 'Private Token is required',
        ip: 'IP addresses are required and should be separated by commas',
        currency: 'Currency is required',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("ssss", name, value)

        if (name === 'currency') {
            setFormValues({
                ...formValues,
                currency: value,
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };


    const navigate = useNavigate();

    const handleGenerateClick = (e) => {
        let key;
        if (e.target.name === 'publicTokenUUId')
            key = 'public_token';
        else
            key = 'private_token';
        const generatedUUID = uuidv4();
        setFormValues({
            ...formValues,
            [key]: generatedUUID,
        });
    };

    const handleIpChange = (e) => {
        const { value } = e.target;
        setFormValues({
            ...formValues,
            ip: value.split(',').map((ip) => ip.trim())
        });
    };

    const handleSubmit = async (e) => {
        const newFormErrors = {};
        if (!formValues.name.trim()) {
            newFormErrors.nameError = validationMessages.name;
        }
        if (!formValues.email.trim()) {
            newFormErrors.emailError = validationMessages.email;
        }
        if (!formValues.password.trim()) {
            newFormErrors.passwordError = validationMessages.password;
        }
        else if (formValues.password.trim().length < 8 || formValues.password.trim().length > 24) {
            newFormErrors.passwordError = 'Password should be bw 8 to 24 characters'
        }
        else if (!(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/
            .test(formValues.password.trim()))) {
            newFormErrors.passwordError = 'Password should be alphanumeric'
        }
        if (!formValues.public_token.trim()) {
            newFormErrors.publicTokenError = validationMessages.public_token;
        }
        if (!formValues.private_token.trim()) {
            newFormErrors.privateTokenError = validationMessages.private_token;
        }
        if (formValues.ip.length === 0) {
            newFormErrors.ipError = validationMessages.ip;
        }
        if (!formValues.currency.trim()) {
            newFormErrors.currencyError = validationMessages.currency;
        }

        setFormErrors(newFormErrors);

        const hasErrors = Object.keys(newFormErrors).length > 0;
        if (!hasErrors) {
            e.preventDefault()
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

            const url = `/${userData.accountId}/new_vendor`;
            try {
                const res = await axios.post(`${configs.REACT_APP_BACKEND_URL}accounts${url}`, formValues, {
                    headers: { Authorization: `Bearer ${userData.jwt}`, Auth: userData.token }
                });
                handleExpiredJwt(res)
                alert("Vendor registration is successful")
                setFormValues({
                    name: '',
                    public_token: '',
                    private_token: '',
                    ip: [],
                    currency: 'USD',
                    status: true,
                    email: '',
                    password: '',
                    allowed_games: [],
                    restricted_games: []
                })
                setFormErrors({
                    nameError: '',
                    publicTokenError: '',
                    privateTokenError: '',
                    ipError: '',
                    currencyError: '',
                    emailError: '',
                    passwordError: ''
                })
            } catch (error) {
                const errorHandler = errorOnHandle(error.response?.status, error.response?.data.msg, navigate)
                if (!errorHandler)
                    return
                else
                    return alert(errorHandler.msg)
            }
        }
        else {
            e.preventDefault()

        }

    };
    return (
        <CContainer
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: '1',
                width: '100%',
            }}
        >
            <CCard style={{ width: '500px' }}>
                <CCardHeader>
                    <h5>Vendor Registration</h5>
                </CCardHeader>
                <CCardBody>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                value={formValues.name}
                                onChange={handleChange}
                            />
                            <span className="text-danger">
                                {formErrors.nameError}
                            </span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="form-control"
                                value={formValues.email}
                                onChange={handleChange}
                            />
                            <span className="text-danger">
                                {formErrors.emailError}
                            </span>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                            <span className="text-danger">
                                {formErrors.passwordError}
                            </span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="public_token">Public Token</label>
                            <input
                                type="text"
                                name="public_token"
                                id="public_token"
                                className="form-control"
                                value={formValues.public_token}
                                onChange={handleChange}
                                disabled
                            />
                            <span className="text-danger">
                                {formErrors.publicTokenError}
                            </span>
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    name='publicTokenUUId'
                                    onClick={handleGenerateClick}
                                >
                                    Generate
                                </button>
                            </div>
                            <input type="hidden" name="public_token" value={formValues.public_token} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="private_token">Private Token</label>
                            <input
                                type="text"
                                name="private_token"
                                id="private_token"
                                className="form-control"
                                value={formValues.private_token}
                                onChange={handleChange}
                                disabled
                            />
                            <span className="text-danger">
                                {formErrors.privateTokenError}
                            </span>
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    name='privateTokenUUId'
                                    onClick={handleGenerateClick}
                                >
                                    Generate
                                </button>
                            </div>
                            <input type="hidden" name="private_token" value={formValues.private_token} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ip">IP</label>
                            <input
                                type="text"
                                name="ip"
                                id="ip"
                                className="form-control"
                                value={formValues.ip.join(', ')}
                                onChange={handleIpChange}
                            />
                            <span className="text-danger">
                                {formErrors.ipError}
                            </span>
                            <small className="text-muted">Separate multiple IP addresses with commas</small>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="currency">Currency</label>
                            <select
                                name="currency"
                                id="currency"
                                className="form-control"
                                value={formValues.currency}
                                onChange={handleChange}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="INR">INR</option>
                                <option value="PKR">PKR</option>
                            </select>
                            <span className="text-danger">
                                {formErrors.currencyError}
                            </span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status">Status</label>
                            <select
                                name="status"
                                id="status"
                                className="form-control"
                                value={formValues.status}
                                onChange={handleChange}
                            >
                                <option value={true}>Allowed</option>
                                <option value={false}>Not Allowed</option>
                            </select>
                            <span className="text-danger">
                                {formErrors.statusError}
                            </span>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </CCardBody>
            </CCard>
        </CContainer>
    );
};

export default AdminCreateVendor;
