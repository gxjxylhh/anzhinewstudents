//index.js at client
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import What from './What';
//import {Route, Redirect} from 'react-router'
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/">
                <App />
            </Route>
            <Route path="/news">
                <What />
            </Route>
        </div>
    </Router>
, document.getElementById('root'));

//<Redirect to="/" />


    //<App/>, document.getElementById('root'));


/*
export default(
    <Route component={App} path="/">
        <Redirect from="*" to="" />
    </Route>
);


 */