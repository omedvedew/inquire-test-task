import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewPostPage = ({
    state,
    dispatchNewPost,
}) => {
    const [newPost, setNewPost] = useState({
        isFormSent: false,
    });

    const handleNewPostTitle = (e) => {
        setNewPost((prevState) => ({
            ...prevState,
            title: e.target.value
        }))
    };

    const handleNewPostContent = (e) => {
        setNewPost((prevState) => ({
            ...prevState,
            body: e.target.value
        }))
    };

    const submitForm = (e) => {
        e.preventDefault();
        function getRandomId() {
            let randomId = [];
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charsLength = chars.length;
            for ( let i = 0; i < 10; i++ ) {
                randomId.push(chars.charAt(Math.floor(Math.random() * charsLength)));
            }
            return randomId.join('');
        }
        dispatchNewPost(getRandomId(), newPost.title, newPost.body);
        setNewPost((prevState)=> ({
            ...prevState,
            id: getRandomId(),
            isFormSent: true
        }));
        axios.post(`https://bloggy-api.herokuapp.com/posts`, {
            id: newPost.id,
            title: newPost.title,
            body: newPost.body
        });
    };

    const renderMessage = () => {
        return (
            <>
                <p>Thank you for sending a new post, you will find it at the <Link to="/blog">blog page</Link>.</p>
            </>
        )
    };

    console.log(newPost);
    console.log(state);

    return (
        <div className="main__new-post-page">
            <h2 className="main__new-post-page__title">Create your post here</h2>
            {
                newPost.isFormSent === false ?
                <form className="main__new-post-page__form" onSubmit={submitForm}>
                    <div className="m-n-f_input-box">
                        <h3 className="m-n-f_input-title">Post's title</h3>
                        <input type="text" placeholder="Enter post title" className="m-n-f_input" onChange={handleNewPostTitle}/>
                    </div>
                    <div className="m-n-f_input-box">
                        <h3 className="m-n-f_input-title">Post's content</h3>
                        <textarea type="text" placeholder="Enter post content" className="m-n-f_input" rows="5" onChange={handleNewPostContent}/>
                    </div>
                    <button className="m-n-f_submit-btn">submit</button>
                </form>
                : renderMessage()
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    state,
})

const mapDispatchToProps = dispatch => ({
    dispatchNewPost: (id, title, body) => dispatch({
        type: "DISPATCH_NEW_POST",
        id,
        title,
        body
    })
});

export default connect(mapStateToProps, mapDispatchToProps) (NewPostPage);