import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="header__logo">
            <Link to="/" className="header__logo__item" style={{backgroundImage: 'url(/images/inquire-logo.png)'}}/>
        </div>
    )
};

export default Logo;