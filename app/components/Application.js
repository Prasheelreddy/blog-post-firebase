import React from 'react';
import Posts from './Posts';
import Authentication from './Authentication';
import { Route, Switch, Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import PostPage from './PostPage';

function Application() {

  return (
    <main className="Application">
      <Link to="/"><h1>Think Piece</h1></Link>
      <Authentication />
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/posts/:id" component={PostPage} />
      </Switch>
    </main>
  )
}

export default Application;
