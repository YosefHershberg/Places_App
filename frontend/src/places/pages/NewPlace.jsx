import React, { useState, useEffect, useContext } from 'react';
import PlaceForm from './PlaceForm';
// import useHttpClient from '../../shared/api/useHttpClient';
import { useHttpClient } from '../../shared/api/http-hook';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../shared/context/auth-context';

const emptyPlaceForm = {
    inputs: {
        title: {
            value: '',
            isValid: false,
        },
        description: {
            value: '',
            isValid: false,
        },
        address: {
            value: '',
            isValid: false,
        },
        image: {
            value: null,
            isValid: false
        }
    },
    isValid: false
}

function NewPlace() {
    const { loggedInUser, token } = useContext(AuthContext)
    const navigate = useNavigate();

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    async function placeSubmit(form) {
        try {
            const formData = new FormData();
            formData.append('title', form.inputs.title.value,)
            formData.append('description', form.inputs.description.value,)
            formData.append('address', form.inputs.address.value,)
            formData.append('image', form.inputs.image.value,)

            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/`,
                'POST',
                formData,
                {
                    Authorization: `Bearer ${token}`
                },
            )
            navigate(`/${loggedInUser.id}/places`, { replace: true });
        } catch (error) { }
    }

    return (
        <PlaceForm
            placeSubmit={placeSubmit}
            place={emptyPlaceForm}
            error={error}
            isLoading={isLoading}
        />
    )
}

export default NewPlace