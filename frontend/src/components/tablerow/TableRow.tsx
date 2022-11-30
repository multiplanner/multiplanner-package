import React from 'react';
import './TableRow.css';
import EditIcon from '../../assets/icons/edit.svg';
import TrashIcon from '../../assets/icons/delete.svg';
import { useNavigate } from 'react-router';
import ArrowIcon from '../../assets/icons/arrow.svg';

interface Props {
    title: String,
    subtitle?: String,
    navigationLink?: string,
    onEditLink?: string,
    onDeleteClick: React.MouseEventHandler<HTMLButtonElement>
}

function TableRow({ title, subtitle="", onEditLink="", onDeleteClick, navigationLink="" }: Props ) {

    const navigate = useNavigate()

    return (
        <div className="table-row">
            <div className="table-row-grey-section" onClick={() => (navigationLink !== "" ? navigate(navigationLink!) : {})}>
                <div className="left-section">
                    <h4 className="left-section-text">{title}</h4>
                    <h5 className="left-section-text">{subtitle}</h5>
                </div>
                {navigationLink !== "" && <img src={ArrowIcon} alt="pijl" className="arrow-icon"/>}
            </div>

            <div className="right-section">
                {onEditLink !== "" &&
                    <button className="edit table-row-button" onClick={() => navigate(onEditLink)}>
                        <img className="table-row-icon" src={EditIcon} alt="wijzig" />
                    </button>
                }
                <button className="trash table-row-button" onClick={onDeleteClick}>
                    <img className="table-row-icon" src={TrashIcon} alt="verwijder" />
                </button>
            </div>
        </div>
    );
}

export default TableRow;