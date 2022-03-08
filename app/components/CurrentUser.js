import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';


const CurrentUser = ({ displayName, photoURL, email, createdAt, children }) => {
  return (
    <section className="CurrentUser">
      <div className="CurrentUser--profile">
        {photoURL && <img src={photoURL} alt={displayName} />}
        <div className="CurrentUser--information">
          <Link to="/profile"><h2>{displayName}</h2></Link>
          <p className="email">{email}</p>
          <p className="created-at">{moment(createdAt.toDate()).calendar()}</p>
        </div>
      </div>
      <div>
        <div>{children}</div>
        <button onClick={() => signOut(auth)} >Sign Out</button>
      </div>
    </section>
  );
};



export default CurrentUser;
