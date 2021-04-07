import React from 'react';

const Comments = ({
    currentPost,
}) => {
    return (
        <div className="m-p-p_comments_comments-box">
            {
                currentPost.comments.map(({id, body}) => (
                    <div className="comment" key={id}>
                        <h4>{id}:</h4>
                        <p>{body}</p>
                    </div>
                ))
            }   
        </div>
    )
};

export default Comments;