import React from 'react';
import { Route } from 'react-router-dom';
import PostsList from './PostsList';
import GreetingsPage from './GreetingsPage';
import PostPage from './PostPage';
import NewPostPage from './NewPostPage';

const Main = () => {
    return (
        <main className="main">
            <Route path='/' exact component={GreetingsPage}/>
            <Route path="/blog" exact component={PostsList}/>
            <Route path="/blog/post-page" exact component={PostPage}/>
            <Route path="/new-post" exact component={NewPostPage}/>
        </main>
    )
};

export default Main;