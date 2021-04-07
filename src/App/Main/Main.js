import React from 'react';
import PostsList from './PostsList';
import { Route } from 'react-router-dom';
import GreetingsPage from './GreetingsPage';

const Main = () => {
    return (
        <main className="main">
            <Route path='/' exact render={() => 
                <GreetingsPage/>
            }/>
            <Route path="/blog" render={() => 
                <PostsList/>
            }/>
        </main>
    )
};

export default Main;