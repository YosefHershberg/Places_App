import React, { useState, useEffect } from 'react';
import './MainHeader.css'


function MainHeader(props) {

    return (
        <header className='main-header'>
            <div className="inner-container">
                {props.children}
            </div>
        </header>
    )
}

export default MainHeader