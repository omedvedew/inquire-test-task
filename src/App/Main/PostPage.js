import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import axios from 'axios';
import PostChangeForm from './PostChangeForm';

const PostPage = ({
    state,
}) => {
    console.log(state);

    const [currentPost, setCurrentPost] = useState({
        isPostDeleted: false,
        isPostChanged: false,
    });

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

    const handleChangeState = () => {
        setCurrentPost(prevState => ({
            ...prevState,
            isPostChanged: true,
        }))
    };

    const deletePost = () => {
        axios.delete(`https://bloggy-api.herokuapp.com/posts/${state.postToBeRenderedId}`);
        setCurrentPost(() => ({
            isPostDeleted: true
        }));
    };

    const [newComment, setNewComment] = useState({
        isCommentSent: false
    });

    const handleCommentContent = (e) => {
        setNewComment(prevState => ({
            ...prevState,
            body: e.target.value
        }))
    };
    const handleCommentAuthor = (e) => {
        setNewComment(prevState => ({
            ...prevState,
            author: e.target.value
        }))
    };

    const sendComment = (e) => {
        e.preventDefault();
        axios.post(`https://bloggy-api.herokuapp.com/comments`, {
            postId: state.postToBeRenderedId,
            body: newComment.body,
            id: newComment.author,
        })
        setNewComment(() => ({
            isCommentSent: true
        }))
    };

    console.log(newComment);

    const renderPostPage = () => {
        return (
            <>
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
                            {
                                newComment.isCommentSent === false ?
                                <>
                                    <h3 className="m-p-p_comments-title">Add new comment:</h3>
                                    <form className="m-p-p_form" onSubmit={sendComment}>
                                        <input type="text" placeholder="Enter your name" className="m-p-p_input" onChange={handleCommentAuthor}/>
                                        <textarea className="m-p-p_input" rows="5" placeholder="Enter comment" onChange={handleCommentContent}/>
                                        <button className="m-p-p_send-btn" type="submit">send</button>
                                    </form>
                                </>
                                : <h3 className="m-p-p_comments-title">Thanks for your comment!</h3>
                            }
                            
                        </div>
                        <div className="m-p-p_buttons-container">
                            {
                                currentPost.isPostChanged === false ?
                                <button className="m-p-p_change-btn" onClick={handleChangeState}>change this post</button>
                                : 
                                <PostChangeForm
                                    id={state.postToBeRenderedId}
                                />
                            }
                            <button className="m-p-p_delete-btn" onClick={deletePost}>delete this post</button>
                        </div>
                    </div> 
                    : renderMessage()
                }
            </>
        )
    }

    return (
        <div className="main__post-page">
            {
                currentPost.isPostDeleted === false ?
                renderPostPage()
                : <div className="main__post-page__delete-message">This post was deleted! Visit <Link to="/blog">&nbsp;blog page&nbsp;</Link> to see another one.</div>
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps) (PostPage);