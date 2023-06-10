import React, { useState, useEffect, useContext } from 'react';
import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElemets/Card';
import Button from '../../shared/components/FormElements/Button';
import './PlaceList.css'
import { AuthContext } from '../../shared/context/auth-context';

function PlaceList({ items }) {
    const { loggedInUser } = useContext(AuthContext)

    if (items.length === 0) {
        return (
            <div className="place-list center">
                <Card>
                    <h2>This user has no places yet..</h2>
                    {loggedInUser? 
                    <Button to="/places/new">Share place</Button> :
                    <Button to="/auth">Authenticate</Button> }
                </Card>
            </div>
        )
    }

    return (
        <ul className="place-list">
            {items.map(place => (
                <PlaceItem key={place.id} place={place} />
            ))}
        </ul>
    )
}

export default PlaceList