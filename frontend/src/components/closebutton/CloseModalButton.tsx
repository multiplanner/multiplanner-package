import React from 'react';
import './CloseModalButton.css';
import CloseIcon from '../../assets/icons/xmark.svg';

interface Props {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

function CloseModalButton({ onClick }: Props ) {

    return (
        <button className="close-button" onClick={onClick}>
            <img className="close-icon" src={CloseIcon} alt="close button" />
        </button>
    );
}

export default CloseModalButton;