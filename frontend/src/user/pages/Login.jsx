import React, { useState, useEffect, useContext } from 'react';
import AuthForm from './AuthForm';
import { AuthContext } from '../../shared/context/auth-context';
import { useNavigate } from 'react-router-dom'
import { useHttpClient } from '../../shared/api/http-hook';

const emptyLoginForm = {
    inputs: {
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        }
    },
    isValid: false
}

function Login() {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    async function handleSubmit(form) {
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users/login`,
                'POST',
                JSON.stringify({
                    email: form.inputs.email.value,
                    password: form.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            // console.log(responseData.token);
            login(responseData.user, responseData.token)
            navigate('/', { replace: true });
        } catch (err) { }
    }

    return (
        <AuthForm
            form={emptyLoginForm}
            handleSubmit={handleSubmit}
            header='Login Required'
            error={error}
            isLoading={isLoading}
        />
    )
}

export default Login