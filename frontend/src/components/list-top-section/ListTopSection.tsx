import React from 'react';
import Button from '../button/Button';
import './ListTopSection.css';
import { useNavigate } from "react-router-dom";
import Searchbar from '../searchbar/Searchbar';

interface Props {
    pageTitle: String,
    buttonTitle: String,
    navigationLink: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

function TopSection({ pageTitle, buttonTitle, navigationLink, onClick }: Props ) {

    const navigate = useNavigate();

    return (
        <div className="top-section-component">
            <h2>{pageTitle}</h2>
            <div className="top-section-component-right">
                <Searchbar placeholderText={'zoeken...'} inputName={'search'} onClick={onClick}/>
                <Button title={buttonTitle} onClick={() => navigate(navigationLink)} />
            </div>
        </div>
    );
}

export default TopSection;