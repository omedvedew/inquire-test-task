import React, { useState } from 'react';
import PostsListItem from './PostsListItem';

const PostsList = () => {

    const [posts, setPosts] = useState([]);

    posts.length === 0?
    fetch('https://bloggy-api.herokuapp.com/posts')
    .then(res => res.json())
    .then(json => (
        setPosts(prevState => ([
            ...prevState,
            ...json,
        ]))
    ))
    : console.log('waiting for response');

    console.log(posts);
    return (
        <div className="main__posts-list-container">
            {
                posts.map(({id, title, body}) => (
                    <div className="main__posts-list-container__item" key={id}>
                        <PostsListItem
                            id={id}
                            title={title}
                            body={body}
                        />
                    </div>
                ))
            }
        </div>
    )
};

export default PostsList;