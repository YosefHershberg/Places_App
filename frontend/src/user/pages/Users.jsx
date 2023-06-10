import React, { useState, useEffect } from 'react';
import UsersList from '../components/UsersList';
import useHttpClient from '../../shared/api/useHttpClient';
import LoadingSpinner from '../../shared/components/UIElemets/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElemets/ErrorModal';

function Users() {
    const { data, error, isLoading } = useHttpClient(`${process.env.REACT_APP_BACKEND_URL}/users`, 'get')

    useEffect(() => {
        error && console.log(error.response.data.message);
    }, [error]);

    if (isLoading) {
        return (
            <div className='center'>
                <LoadingSpinner />
            </div>
        )
    }


    if (error) {
        return <ErrorModal 
        error={error.response.data.message}
        // onClear={() => {error = undefined}}
        />
    }

    return (
        <UsersList items={data.users} />
    )
}

export default Users