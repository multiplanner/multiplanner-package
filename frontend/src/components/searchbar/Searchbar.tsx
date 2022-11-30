import React from 'react';
import './Searchbar.css';
import SearchIcon from '../../assets/icons/search.svg';

interface Props {
    placeholderText: string,
    inputName: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

function Searchbar({ placeholderText, inputName, onClick }: Props ) {

    return (
        <div className="searchbar-container">
            <input className="searchbar" type="text" name={inputName} placeholder={placeholderText + "..."}/>
            <button className="search-button" onClick={onClick}>
                <img src={SearchIcon} alt="zoeken" className="search-icon" />
            </button>
        </div>
    );
}

export default Searchbar;