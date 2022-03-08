import React, { Component } from 'react';

import { withRouter, Link, Redirect } from 'react-router-dom';
import Post from './Post';
import Comments from './Comments';
import { firestore } from '../firebase';
import { addDoc, doc, onSnapshot, collection } from "firebase/firestore";
import withUser from './WithUser';

class PostPage extends Component {
    state = { post: null, comments: [], loaded: false };

    get postId() {
        return this.props.match.params.id;
    }

    get postRef() {
        return doc(firestore, `/posts/${this.postId}`);
    }

    get commentsRef() {
        return collection(this.postRef, 'comments');
    }

    unsubscribeFromPost = [];
    unsubscribeFromComments = [];

    componentDidMount = () => {
        this.unsubscribeFromPost = onSnapshot(this.postRef, docs => {
            console.log(docs.data())
            this.setState({ post: { id: docs.id, ...docs.data() }, loaded: true })

        });

        this.unsubscribeFromComments = onSnapshot(this.commentsRef, (docs) => {
            console.log("comments snapshot ");
            // console.log(doc.data())
            console.log(docs)
            const comments = [];
            docs.forEach((doc) => {
                comments.push({ id: doc.id, ...doc.data() })
            })

            // const comments = snapshot.docs.map(collectIdsAndData);
            this.setState({ comments });
        });
    };

    componentWillUnmount = () => {
        this.unsubscribeFromPost();
        this.unsubscribeFromComments();
    };

    createComment = (comment) => {
        const { user } = this.props
        addDoc(this.commentsRef, {
            ...comment,
            ...user,
        });
    };

    render() {
        const { post, comments, loaded } = this.state;

        if (!loaded) return <p>Loading…</p>;

        return (
            <section>
                {post && <Post {...post} />}
                <Comments
                    comments={comments}
                    postId={post.id}
                    onCreate={this.createComment}
                />
                <footer>
                    <Link to="/">&larr; Back</Link>
                </footer>
            </section>
        );
    }
}

export default withRouter(withUser(PostPage));