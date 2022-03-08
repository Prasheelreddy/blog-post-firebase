// Import the functions you need from the SDKs  need
import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"
import { getAuth, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCIyOoadYrStusRmnLb_WizDB9urULvyCs",
    authDomain: "rock-task-315605.firebaseapp.com",
    projectId: "rock-task-315605",
    storageBucket: "rock-task-315605.appspot.com",
    messagingSenderId: "399114705688",
    appId: "1:399114705688:web:e06ff96adff696175fdc6d",
    measurementId: "G-3F0B7310Z5"
};

//InitializeFirebase
const firebase = initializeApp(firebaseConfig);
window.firebase = firebase

export const firestore = getFirestore();
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const SignOut = () => signOut(auth);
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const storage = getStorage();;


export default firebase;


// const analytics = getAnalytics(app);



export const createUserDocument = (user, additionalData) => {
    // If there is no user, let's not do this.

    if (!user) return;

    // Get a reference to the location in the Firestore where the user
    // document may or may not exist.
    const userRef = doc(firestore, `users/${user.uid}`);
    console.log("userRef : " + userRef)
    // Go and fetch a document from that location
    return getDoc(userRef)
        .then((snapshot) => {
            if (!snapshot.exists()) {
                const { displayName, email, photoURL } = user;
                const createdAt = new Date();
                return setDoc(userRef, {
                    displayName,
                    email,
                    photoURL,
                    createdAt,
                    ...additionalData,
                })
                    .then(() => {
                        // console.log("createdocUser successful")
                        return getUserDocument(user.uid)
                    })
                    .catch((error) => {
                        console.error('Error creating user', error);
                    })
            }

            else {
                return getUserDocument(user.uid)
            }

        })

};

export const getUserDocument = uid => {
    // console.log("uid ", uid)
    if (!uid) return null;

    return doc(firestore, `users/${uid}`)

};