import React, { useReducer, useEffect, useState } from 'react'
import { validate } from '../../utils/validators';
import './Input.css'

function inputReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.payload,
                isValid: validate(action.payload, action.validators)
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

function Input(props) {
    const { label, id, type, placeholder, rows, errorText, validators, onInput, initValue } = props;
    const [isFocused, setIsFocused] = useState(false)

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initValue || '',
        isTouched: false,
        isValid: initValue ? true : false,
    })

    const { value, isValid } = inputState

    useEffect(() => {
        onInput(id, value, isValid)
    }, [isValid, value]);

    function handleChange(e) {
        dispatch({ type: 'CHANGE', payload: e.target.value, validators: validators })
    }

    function touchHandler() {
        dispatch({ type: 'TOUCH' })
        setIsFocused(false)
    }

    const element = (props.element === 'input' ?
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            value={inputState.value}
            onBlur={touchHandler}
            onFocus={() => setIsFocused(true)}
        /> :
        <textarea
            id={id}
            rows={rows || 3}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            value={inputState.value}
            onBlur={touchHandler}
            onFocus={() => setIsFocused(true)}
        />
    )

    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && !isFocused && 'form-control--invalid'}`}>
            <label htmlFor={id}>{label}</label>
            {element}
            {!inputState.isValid && inputState.isTouched && !isFocused && <p>{errorText}</p>}
        </div>
    )
}

export default Input