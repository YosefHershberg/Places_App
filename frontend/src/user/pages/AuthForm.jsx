import React, { useState, useEffect } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import useForm from '../../shared/hooks/FormHook';
import Card from '../../shared/components/UIElemets/Card';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators'
import LoadingSpinner from '../../shared/components/UIElemets/LoadingSpinner'
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import './AuthForm.css'

function AuthForm({ form, handleSubmit, header, isLoading, error, signUpMode }) {
  const [inputHandler, formState] = useForm(form)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordType, setPasswordType] = useState('password')

  useEffect(() => {
    setPasswordType(showPassword ? 'text' : 'password')
  }, [showPassword]);

  function handleSubmit1(e) {
    e.preventDefault()
    handleSubmit(formState)
  }

  return (
    <Card className='authentication'>
      <h2 className='authentication__header'>{header}</h2>
      <hr />
      <form onSubmit={handleSubmit1}>
        {/* // Checking if signup mode or login mode */}
        {signUpMode && <>
          <Input
            element='input'
            label='Name'
            id='name'
            type='text'
            placeholder='Enter Name'
            errorText='Invalid Name! Enter at least 5 charecters '
            validators={[VALIDATOR_MINLENGTH(3)]}
            onInput={inputHandler}
          />
          <ImageUpload
            id='image'
            center
            errorText
            onInput={inputHandler}
          />
        </>
        }
        <Input
          element='input'
          label='Email'
          id='email'
          type='email'
          placeholder='Enter Email Address'
          errorText='Invalid Email Address'
          validators={[VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Input
          element='input'
          label='Password'
          id='password'
          type={passwordType}
          placeholder='Enter Password'
          errorText='Invalid Password! Enter at least 5 charecters'
          validators={[VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
        />
        <div>
          <input type="checkbox" id="showPassword" onClick={() => setShowPassword(prev => !prev)} />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <div className="center">
          <Button type='submit' disabled={!formState.isValid}>
            {isLoading ? <LoadingSpinner /> : 'Submit'}
          </Button>
        </div>
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </form>
    </Card>
  )
}

export default AuthForm