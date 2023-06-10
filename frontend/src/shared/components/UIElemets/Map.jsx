import React, { useCallback, useEffect, useRef } from 'react';
import './Map.css'

function Map(props) {
    const { className, location, zoom } = props
    const mapRef = useRef()

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            zoom: zoom,
            center: location,
        })
        new window.google.maps.Marker({
            position: location,
            map: map,
        });
    }, [location, zoom])

    return (
        <div ref={mapRef} className={`map ${className}`}></div>
    )
}

export default Map