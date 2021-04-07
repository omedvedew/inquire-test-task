import React, { useState } from 'react';
import axios from 'axios';

const PostChangeForm = ({
    id,
}) => {
    // Using 'useState' hook to implement changing form submit
    const [changes, setChanges] = useState({
        isChangesSubmited: false
    });

    // Function for entering new title for post
    const handleTitle = (e) => {
        setChanges(prevState => ({
            ...prevState,
            title: e.target.value,
        }))
    };

    // Function for entering new content for post
    const handleContent = (e) => {
        setChanges(prevState => ({
            ...prevState,
            body: e.target.value,
        }))
    };

    // Sumbit form function 
    const sendChanges = (e) => {
        e.preventDefault();
        axios.put(`https://bloggy-api.herokuapp.com/posts/${id}`, {
            title: changes.title,
            body: changes.body
        });
        setChanges(prevState => ({
            ...prevState,
            isChangesSubmited: true
        }));
    }; 

    // Main component of PostChangeForm
    return (
        <>
            {
                changes.isChangesSubmited === false ?
                <form className="m-p-p_post-change-form" onSubmit={sendChanges}>
                    <h2 className="m-p-p_form-title">Change this post:</h2>
                    <div className="m-p-p_input-box">
                        <h3 className="m-p-p_input-title">Post's title</h3>
                        <input type="text" placeholder="Enter post title" className="m-p-p_input" onChange={handleTitle}/>
                    </div>
                    <div className="m-p-p_input-box">
                        <h3 className="m-p-p_input-title">Post's content</h3>
                        <textarea type="text" placeholder="Enter post content" className="m-p-p_input" rows="5" onChange={handleContent}/>
                    </div>
                    <button className="m-p-p_submit-btn">submit</button>
                </form>
                : <div className="m-p-p_message">Thanks for changes!</div>
            }
        </>
    )
};

export default PostChangeForm;