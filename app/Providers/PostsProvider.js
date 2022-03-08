import React from 'react';
import { firestore } from '../firebase';
import { collection, onSnapshot } from "firebase/firestore";


export const PostsContext = React.createContext();

export default function PostsProvider({ children }) {

    const [post, setPost] = React.useState({ posts: [] });

    React.useEffect(() => {

        const unsubscribeFromFirestore = onSnapshot(collection(firestore, "posts"), (docs) => {
            const posts = [];
            docs.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() })
            })
            setPost(({ posts: posts }));
            console.log(posts);
        })

        return unsubscribeFromFirestore;
    }, [])

    return (
        <PostsContext.Provider value={post}>{children}</PostsContext.Provider>

    )


}