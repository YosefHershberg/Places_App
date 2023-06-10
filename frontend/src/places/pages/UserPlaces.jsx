import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';
import useHttpClient from '../../shared/api/useHttpClient';
import LoadingSpinner from '../../shared/components/UIElemets/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElemets/ErrorModal';


function UserPlaces() {
    const { userId } = useParams()
    const { data, isLoading, error } = useHttpClient(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`, 'get')

    if (isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return <ErrorModal error={error.response.data.message} />
    }


    if (data) return (
        <PlaceList
            items={data.places}
        />
    )
}

export default UserPlaces