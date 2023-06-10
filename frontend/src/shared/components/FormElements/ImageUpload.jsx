import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import './ImageUpload.css'

function ImageUpload({ id, center, onInput, errorText }) {
    const [file, setFile] = useState()
    const [previewUrl, setPreviewUrl] = useState()
    const [isValid, setIsValid] = useState(false)
    const filePickerRef = useRef()

    function pickImageHandler() {
        filePickerRef.current.click()
    }

    function pickedHandler(event) {
        // console.log(event.target.files);
        let pickedFile;
        let fileIsValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0]
            setFile(pickedFile)
            fileIsValid = true
            setIsValid(true)
        } else {
            fileIsValid = false
            setIsValid(false)
        }
        // console.log(fileIsValid);
        onInput(id, pickedFile, fileIsValid)
    }

    useEffect(() => {
        if (!file) {
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }, [file]);

    return (
        <div className="form-control">
            <input
                ref={filePickerRef}
                type="file"
                id={id}
                style={{ display: 'none' }}
                accept='.jpg,.png,jpeg'
                onChange={pickedHandler}
            />
            <div className={`image-upload ${center && 'center'}`}>
                {previewUrl ? <div className="image-upload__preview">
                    <img src={previewUrl} alt="Preview" />
                </div> : <p>Please pick an image</p>}
                <Button type='button' onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
            {!isValid && <p>{errorText}</p>}
        </div>
    )
}

export default ImageUpload