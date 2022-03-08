import React from 'react';
import { firestore } from '../firebase';
import { addDoc, collection } from "firebase/firestore";

function AddPost({ user }) {

  const [state, setState] = React.useState({ title: '', content: '' })

  const handleChange = event => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = event => {
    const { uid, displayName, photoURL, email } = user;

    event.preventDefault();

    const { title, content } = state;

    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date()
    }

    addDoc(collection(firestore, "posts"), post)

    setState({ title: '', content: '' });
  };


  const { title, content } = state;
  return (
    <form onSubmit={handleSubmit} className="AddPost">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="content"
        placeholder="Body"
        value={content}
        onChange={handleChange}
      />
      <input className="create" type="submit" value="Create Post" />
    </form>
  );

}

export default AddPost;
