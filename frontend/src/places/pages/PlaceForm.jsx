import React, { useState, useEffect } from 'react';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import Button from '../../shared/components/FormElements/Button';
import useForm from '../../shared/hooks/FormHook';
import LoadingSpinner from '../../shared/components/UIElemets/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import './PlaceForm.css'

function PlaceForm({ place, placeSubmit, updateMode, error, isLoading }) {
  const [inputHandler, formState] = useForm(place)

  function isPlaceEqualToStateForm() {
    let result = true;
    for (const key in formState.inputs) {
      if (formState.inputs[key].value !== place.inputs[key].value) result = false
    }
    return result
  }

  // const inputHandler = useCallback((id, value, isValid) => {
  //   dispatch({
  //     type: 'INPUT_CHANGE',
  //     value: value,
  //     isValid: isValid,
  //     inputId: id
  //   })
  // }, [dispatch])

  function placeSubmitLocal(e) {
    e.preventDefault()
    placeSubmit(formState);
  }

  return (
    <form className='place-form' onSubmit={placeSubmitLocal}>
      <Input
        id='title'
        type='text'
        label='Title'
        element='input'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title'
        onInput={inputHandler}
        initValue={place?.inputs.title.value}
      />
      <Input
        id='description'
        label='Description'
        type='text'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid descripition. (5 characters at least)'
        onInput={inputHandler}
        initValue={place?.inputs.description.value}
      />
      {!updateMode && <>
        <Input
          id='address'
          label='Address'
          type='text'
          element='input'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid adress'
          onInput={inputHandler}
          initValue={place?.inputs.address.value}
        />
        <ImageUpload 
          id='image'
          center
          errorText
          onInput={inputHandler}
        />
      </>
      }
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button type='submit' disabled={(formState.isValid && place && isPlaceEqualToStateForm()) | !formState.isValid}>
          {isLoading ?
            <div className='center'>
              <LoadingSpinner />
            </div> :
            updateMode ? 'Update' : 'Add Place'}
        </Button>
      </div>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </form>
  )
}

export default PlaceForm