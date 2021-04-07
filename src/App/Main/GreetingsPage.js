import React from 'react';
import { Link } from 'react-router-dom';

const GreetingsPage = () => {
    return (
        <div className="main__greetings-page">
            <h1 className="main__greetings-page_title">Welcome to Olexii's test task page!</h1>
            <Link to="/blog" className="main__greetings-page_get-started-btn">get started</Link>
        </div>
    )
};

export default GreetingsPage;