import React, { useState, useEffect, useContext } from 'react';
import PlaceForm from './PlaceForm';
import { useParams, useNavigate } from 'react-router-dom'
import Card from '../../shared/components/UIElemets/Card'
import { useHttpClient } from '../../shared/api/http-hook';
import LoadingSpinner from '../../shared/components/UIElemets/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';

function UpdatePlace() {
    const { placeId } = useParams()
    const navigate = useNavigate()
    const [loadedPlace, setLoadedPlace] = useState()
    const { loggedInUser, token } = useContext(AuthContext)

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
                );
                setLoadedPlace(responseData.place);
            } catch (err) { }
        };
        fetchPlace();
    }, []);

    const placeSubmit = async (form) => {
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: form.inputs.title.value,
                    description: form.inputs.description.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            );
            navigate('/' + loggedInUser.id + '/places', { replace: true });
        } catch (err) { }
    };

    const placeFormated = {
        inputs: {
            title: {
                value: loadedPlace?.title,
                isValid: true,
            },
            description: {
                value: loadedPlace?.description,
                isValid: true,
            },
            address: {
                value: loadedPlace?.address,
                isValid: true,
            },
        },
        isValid: true
    }

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        )
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        )
    }

    if (loadedPlace) return (
        <PlaceForm
            placeSubmit={placeSubmit}
            place={placeFormated}
            updateMode={true}
            isLoading={isLoading}
            error={error !== 'The user aborted a request.' && error}
        />
    )
}

export default UpdatePlace