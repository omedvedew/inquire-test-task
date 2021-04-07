import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div className="header__menu">
            <Link to="/blog" className="header__menu__item">blog</Link>
        </div>
    )
};

export default Menu;