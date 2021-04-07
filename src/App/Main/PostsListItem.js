import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const PostsListItem = ({
    id,
    title,
    body,
    dispatchPostId,
}) => {
    return (
        <>
            <article className="m-p-i_article">
                <h2 className="m-p-i_article_title">{title}</h2>
                <p className="m-p-i_article_body">{body}</p>
                <Link to="/blog/article-page" className="m-p-i_article_more-btn" onClick={() => dispatchPostId(id)}>read more</Link>
            </article>
        </>
    )
};

const mapStateToProps = (state) => ({
    state,
});

const mapDispatchToProps = dispatch => ({
    dispatchPostId: (value) => dispatch({
        type: "DISPATCH_POST_ID",
        value,
    })
})

export default connect(mapStateToProps, mapDispatchToProps) (PostsListItem);