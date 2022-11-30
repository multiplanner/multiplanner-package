import React from 'react';
import './Button.css';

interface Props {
    title: String,
    disabled?: boolean,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

function Button({ title, disabled = false, onClick }: Props ) {

    const classNameString = "button"

    return (
        <button disabled={disabled} className={classNameString + ` button-${disabled ? "disabled" : "enabled"}`} onClick={onClick}>
            {title}
        </button>
    );
}

export default Button;