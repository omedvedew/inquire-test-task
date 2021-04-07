import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import axios from 'axios';
import PostChangeForm from './PostChangeForm';

const PostPage = ({
    state,
}) => {
    // Checking if redux works
    console.log(state);

    // Using 'useState' hook to implement current post page
    const [currentPost, setCurrentPost] = useState({
        isPostDeleted: false,
        isPostChanged: false,
    });

    // Function for getting info about post from server
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
    // Calling function to get info from server
    state.postToBeRenderedId ? getCurrentPost() : console.log('waiting for response');

    // Function for rendering message if there are no comments for the current post
    const renderNoCommentsMessage = () => {
        return (
            <div className="m-p-p_comments_comments-box">There is no comments to this post.</div>
        )
    };

    // Function for rendering message if current post wasn't selected or page has been refreshed
    const renderMessage = () => {
        return (
            <div className="main__post-page__message">
                <p>We are waiting for server response or the current post wasn't selected, please return to <Link to="/blog">blog page</Link> and select a post you would like to see.</p>
            </div>
        )
    };

    // Changing status check
    const handleChangeState = () => {
        setCurrentPost(prevState => ({
            ...prevState,
            isPostChanged: true,
        }))
    };

    // Function to delete current post
    const deletePost = () => {
        axios.delete(`https://bloggy-api.herokuapp.com/posts/${state.postToBeRenderedId}`);
        setCurrentPost(() => ({
            isPostDeleted: true
        }));
    };

    // 'useState' hook for implement new comment sending
    const [newComment, setNewComment] = useState({
        isCommentSent: false
    });

    // Function for entering new comment content
    const handleCommentContent = (e) => {
        setNewComment(prevState => ({
            ...prevState,
            body: e.target.value
        }))
    };

    // Function for entering new comment author
    const handleCommentAuthor = (e) => {
        setNewComment(prevState => ({
            ...prevState,
            author: e.target.value
        }))
    };

    // Send new comment function
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

    // Function for rendering main content of PostPage component
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

    // Main component of PostPage
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

// Redux function for connecting reducer state to this component props
const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps) (PostPage);