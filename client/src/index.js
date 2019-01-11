import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import WebFont from 'webfontloader';
import history from './history';

import 'semantic-ui/dist/semantic.min.css';
import './styles/App.scss';



WebFont.load({
    google: {
      families: ['Titillium Web:300,400,700', 'sans-serif']
    }
});


ReactDOM.render((
        <Router history={history}>
            <App />
        </Router>),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
