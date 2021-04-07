import React from 'react';
import PostsList from './PostsList';
import { Route } from 'react-router-dom';
import GreetingsPage from './GreetingsPage';
import PostPage from './PostPage';

const Main = () => {
    return (
        <main className="main">
            <Route path='/' exact render={() => 
                <GreetingsPage/>
            }/>
            <Route path="/blog" exact render={() => 
                <PostsList/>
            }/>
            <Route path="/blog/article-page" exact render={() =>
                <PostPage/> 
            }/>
        </main>
    )
};

export default Main;