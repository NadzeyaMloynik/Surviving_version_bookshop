import React from 'react';
import { ListGroup } from 'react-bootstrap';
import {NavLink} from "react-router-dom";

const AdmBar = ({ onSectionChange }) => {
    return (
        <div className="adm-bar-container">
            <ListGroup className="adm-bar">
                <ListGroup.Item onClick={() => onSectionChange('Books')}>Книги</ListGroup.Item>
                <ListGroup.Item onClick={() => onSectionChange('Orders')}>Заказы</ListGroup.Item>
            </ListGroup>
        </div>
    );
};

export default AdmBar;
