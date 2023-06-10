import React, { useState, useEffect } from 'react';
import UsersItem from './UsersItem';
import Card from '../../shared/components/UIElemets/Card';
import Button from '../../shared/components/FormElements/Button';
import './UsersList.css'

function UsersList({ items }) {

    if (items.length === 0) {
        return (
            <div className='center'>
                <Card>
                    <h2>No users found !</h2>
                    <Button to='/auth'>Authenticate</Button>
                </Card>
            </div>
        )
    }

    return (
        <ul className='users-list'>
            {items.map(user => <UsersItem
                key={user.id}
                user={user}
            />)}
        </ul>
    )
}

export default UsersList