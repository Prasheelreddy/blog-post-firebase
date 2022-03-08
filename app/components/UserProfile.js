import React, { Component } from 'react';
import { auth, firestore } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
//
class UserProfile extends Component {
    state = { displayName: '' };
    imageInput = null;

    get uid() {
        return auth.currentUser.uid;
    }

    get userRef() {
        return doc(firestore, `users/${this.uid}`);
    }


    get file() {
        return this.imageInput && this.imageInput.files[0];
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { displayName } = this.state;

        if (displayName) {
            updateDoc(this.userRef, this.state);
        }

        if (this.file) {

            const storageRef = ref(storage, `user-profile/${this.uid}/${this.file.name}`)

            uploadBytes(storageRef, this.file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(snapshot.ref)
                    .then((photoURL) => updateDoc(this.userRef, { photoURL }))
                console.log(snapshot)
            });

        }
    };

    render() {
        const { displayName } = this.state;

        return (
            <section className="UserProfile">
                <form onSubmit={this.handleSubmit} className="UpdateUser">
                    <input
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Display Name"
                        onChange={this.handleChange}
                    />
                    <input type="file" ref={ref => (this.imageInput = ref)} />
                    <input className="update" type="submit" />
                </form>
            </section>
        );
    }
}

export default UserProfile;