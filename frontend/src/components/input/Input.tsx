import React from 'react';
import './Input.css';

interface Props {
    placeholderText: string,
    inputName: string,
    inputLength?: string,
    inputType: string,
    inputLabel: string,
    onChange:any,
    value:any,
    errors: string[]
}

function Input({ placeholderText, inputName, inputLength = "short", inputType, inputLabel,onChange,value,errors = []}: Props ) {

    return (
        <div>
            <h4 className="input-label">{inputLabel}</h4>
            <input className={"input length-" + inputLength} onChange={onChange} value={value} id={inputName} type={inputType} name={inputName} placeholder={placeholderText + "..."} step="any"/>
            {errors.map(error => {
                return <p className="error">{error}</p>
            })}
        </div>
    );
}

export default Input;