import React, { useState, useEffect, useContext } from 'react'
import Card from '../../shared/components/UIElemets/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElemets/Modal'
import Map from '../../shared/components/UIElemets/Map'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttpClient } from '../../shared/api/http-hook'
import LoadingSpinner from '../../shared/components/UIElemets/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElemets/ErrorModal'
import { useNavigate } from 'react-router-dom'
import './PlaceItem.css'

function PlaceItem({ place }) {
    const { image, title, address, description, creator, location, id } = place
    const [showMap, setShowMap] = useState(false)
    const [showDeleteQ, setShowDeleteQ] = useState(false)
    const { loggedInUser, token } = useContext(AuthContext)
    const navigate = useNavigate()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()


    async function handleDelete() {
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
                'DELETE',
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            )
            setShowDeleteQ(false)
            navigate(`/`, { replace: true });
        } catch (error) { }
    }

    function handleEdit() {
        navigate(`/places/${id}`, { replace: true });
    }

    if (error) {
        return (
            <ErrorModal error={error} onClear={clearError}/>
        )
    }

    return (
        <>
            <Modal
                onCancel={() => setShowMap(false)}
                show={showMap}
                className='scale-in-center'
                header={address}
                contentClass='place-item__model-content'
                footerClass='place-item__model-actions'
                footer={<Button onClick={() => setShowMap(false)}>Close</Button>}
            >
                <div className='map-container'>
                    <Map location={location} zoom={13} />
                </div>
            </Modal>
            <Modal
                onCancel={() => setShowDeleteQ(false)}
                show={showDeleteQ}
                header='Are you sure?'
                className='scale-in-center'
                contentClass='place-item__model-content'
                footerClass='place-item__model-actions'
                footer={<>
                    <Button danger onClick={() => setShowDeleteQ(false)}>Cancel</Button>
                    <Button inverse onClick={handleDelete}>
                        {!isLoading ? 'Proceed' :
                            <LoadingSpinner />
                        }
                    </Button>
                </>}
            >
                <h4 className='center'>Are you sure you want to delete this place? <br />
                    Please note that it can't be undone thereafter</h4>
            </Modal>
            <li className='place-item'>
                {isLoading &&
                    <LoadingSpinner asOverlay />
                }
                <Card className='place-item__content'>
                    <div className='place-item__image'>
                        <img src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt={title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{title}</h2>
                        <h3>{address}</h3>
                        <p>{description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={() => setShowMap(true)}>View on Map</Button>
                        {loggedInUser?.id === place.creator && <>
                            <Button onClick={handleEdit}>Edit</Button>
                            <Button danger onClick={() => setShowDeleteQ(true)}>Delete</Button>
                        </>}
                    </div>
                </Card>
            </li>
        </>
    )
}

export default PlaceItem