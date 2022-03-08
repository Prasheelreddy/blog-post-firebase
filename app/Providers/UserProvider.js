import React from 'react';
import { firestore, auth, createUserDocument } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";


export const UserContext = React.createContext({ user: null });

export default function UserProvider({ children }) {

    const [user, setState] = React.useState({ user: null });

    React.useEffect(() => {
        const unsubscribeFromAuth = onAuthStateChanged(auth, (userAuth) => {
            // if (!userAuth) {
            //     setState({ user: null })
            // }

            if (userAuth) {
                createUserDocument(userAuth)
                    .then((userRef) => {
                        onSnapshot(userRef, (snapshot) => {
                            console.log("userref_snapsjot :")
                            console.log(snapshot.data())
                            setState({ user: { uid: snapshot.id, ...snapshot.data() } })
                        })
                    })
            } else {
                setState({ user: null })
            }

        })

        return unsubscribeFromAuth;

    }, [])

    return (
        <UserContext.Provider value={user}>{children}</UserContext.Provider>

    )


}