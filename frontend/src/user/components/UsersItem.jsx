import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../shared/components/UIElemets/Avatar'
import Card from '../../shared/components/UIElemets/Card'
import './UserItem.css'

function UsersItem({ user }) {
    const { name, places, image } = user

    return (
        <li className="user-item">
            <Card className='user-item__content'>
                <Link to={`/${user.id}/places`}>
                    <div className='user-item__image'>
                        <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt={name} />
                    </div>
                    <div className='user-item__info'>
                        <h2>{name}</h2>
                        <h3>{places.length} {places.length === 1 ? 'place' : 'places'}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    )
}

export default UsersItem