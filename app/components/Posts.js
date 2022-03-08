import React from 'react'
import Post from './Post';
import AddPost from './AddPost';
import { PostsContext } from '../Providers/PostsProvider';
import { UserContext } from '../Providers/UserProvider';


const Posts = () => {
  const { posts } = React.useContext(PostsContext);
  const { user } = React.useContext(UserContext);

  return (
    <section className="Posts">
      {user && <AddPost user={user} />}
      {posts.map(post => <Post {...post} key={post.id} />)}
    </section>
  )
}

export default Posts;
