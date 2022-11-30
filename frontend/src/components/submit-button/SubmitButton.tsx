import React from 'react';
import './SubmitButton.css';

interface Props {
    value:any,
    disabled?: boolean
}

function SubmitButton({ value, disabled = false }: Props ) {

    const classNameString = "submit-button"

    return (
        <div>
            <input type='submit' className={classNameString + ` submit-button-${disabled ? "disabled" : "enabled"}`} disabled={disabled} value={value}/>
        </div>
    );
}

export default SubmitButton;