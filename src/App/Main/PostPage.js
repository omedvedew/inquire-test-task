import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comments from './Comments';

const PostPage = ({
    state,
}) => {
    console.log(state);

    const [currentPost, setCurrentPost] = useState({});

    const getCurrentPost = () => {
        if (state.isPostDownloaded !== true) {
            fetch(`https://bloggy-api.herokuapp.com/posts/${state.postToBeRenderedId}?_embed=comments`)
            .then(res => res.json())
            .then(json => (
                setCurrentPost(prevState => ({
                    ...prevState,
                    ...json,
                }))
            ));
        };
        state.isPostDownloaded = true;
        console.log(currentPost);
    };
    state.postToBeRenderedId ? getCurrentPost() : console.log('waiting for response');

    const renderNoCommentsMessage = () => {
        return (
            <div className="m-p-p_comments_comments-box">There is no comments to this post.</div>
        )
    };

    const renderMessage = () => {
        return (
            <div className="main__post-page__message">
                <p>We are waiting for server response or the current post wasn't selected, please return to <Link to="/blog">blog page</Link> and select a post you would like to see.</p>
            </div>
        )
    };

    return (
        <div className="main__post-page">
            {
                state.isPostDownloaded === true ?
                <div className="main__post-page__post">
                    <h1 className="m-p-p_title">{currentPost.title}</h1>
                    <p className="m-p-p_body">{currentPost.body}</p>
                    <div className="m-p-p_comments">
                        <h3 className="m-p-p_comments_title">Comments:</h3>
                        {
                            currentPost.comments !== undefined && currentPost.comments !== null ?
                            (currentPost.comments.length > 0?
                                <Comments
                                    currentPost={currentPost}
                                /> : renderNoCommentsMessage()
                            )
                            : renderNoCommentsMessage() 
                        }
                    </div>
                </div> 
                : renderMessage()
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps) (PostPage);