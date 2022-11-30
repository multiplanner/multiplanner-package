import React from 'react';
import Button from '../button/Button';
import './DetailTopSection.css';
import { useNavigate } from "react-router-dom";
import Searchbar from '../searchbar/Searchbar';

interface Props {
    pageTitle: String,
    buttonTitle: String,
    navigationLink: string,
    subheading: string
}

function DetailTopSection({ pageTitle, buttonTitle, navigationLink, subheading }: Props ) {

    const navigate = useNavigate();

    return (
        <div className="detail-top-section">
            <div>
                <h2 className="detail-top-section-margin">{pageTitle}</h2>
                <h3 className="detail-top-section-margin">{subheading}</h3>
            </div>
            <Button title={buttonTitle} onClick={() => navigate(navigationLink)}/>
        </div>
    );
}

export default DetailTopSection;