import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewPostPage = () => {

    // Using 'useState' hook to implement new post
    const [newPost, setNewPost] = useState({
        isFormSent: false,
    });

    // Function for entering new post title
    const handleNewPostTitle = (e) => {
        setNewPost((prevState) => ({
            ...prevState,
            title: e.target.value
        }))
    };

    // Function for entering new post content
    const handleNewPostContent = (e) => {
        setNewPost((prevState) => ({
            ...prevState,
            body: e.target.value
        }))
    };

    // Submit form
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
        };
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

    // Message rendered after post has been sent 
    const renderMessage = () => {
        return (
            <>
                <p>Thank you for sending a new post, you will find it at the <Link to="/blog">blog page</Link>.</p>
            </>
        )
    };

    // Main component of NewPostPage
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

export default NewPostPage;