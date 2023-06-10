import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthForm from './AuthForm';
import { AuthContext } from '../../shared/context/auth-context';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../shared/api/http-hook';

const emptySignInForm = {
    inputs: {
        name: {
            value: '',
            isValid: false,
        },
        image: {
            value: null,
            isValid: false
        },
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

function Signup() {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()


    async function handleSubmit(form) {
        try {
            const formData = new FormData();
            formData.append('email', form.inputs.email.value,)
            formData.append('name', form.inputs.name.value,)
            formData.append('password', form.inputs.password.value,)
            formData.append('image', form.inputs.image.value,)
            console.log(formData);
            const res = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
                'POST',
                formData,
                {}
            )
            console.log(res);
            login(res.user, res.token)
            navigate('/', { replace: true });
        } catch (error) { }
    }

    return (
        <AuthForm
            form={emptySignInForm}
            handleSubmit={handleSubmit}
            header='Sign Up'
            isLoading={isLoading}
            error={error}
            signUpMode={true}
        />
    )
}

export default Signup