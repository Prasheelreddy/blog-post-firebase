import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.scss';
import Application from './components/Application';
import PostsProvider from './Providers/PostsProvider';
import UserProvider from './Providers/UserProvider'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
    <Router>
        <UserProvider>
            <PostsProvider>
                <Application />
            </PostsProvider>
        </UserProvider>
    </Router>
    ,
    document.getElementById('root')
)