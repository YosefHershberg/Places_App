import React, { useState, useEffect } from 'react';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElemets/Card';
import { Outlet } from 'react-router-dom';
import './Auth.css'

function Auth() {
    return (
        <div className='center'>
            <Card className='authenticate'>
                <Button to='login'>Log In</Button>
                <br />
                <Button to='signup'>Sign Up</Button>
            </Card>
        </div>
    )
}

export default Auth