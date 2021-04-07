import React from 'react';
import { Link } from 'react-router-dom';

const PostsListItem = ({
    id,
    title,
    body,
}) => {
    return (
        <>
            <article className="m-p-i_article">
                <h2 className="m-p-i_article_title">{title}</h2>
                <p className="m-p-i_article_body">{body}</p>
                <Link to="/blog/article-page" className="m-p-i_article_more-btn">read more</Link>
            </article>
        </>
    )
};

export default PostsListItem;