import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import history from './history';
import {Router, Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import AddCandidate from './components/AddCandidate';
// import CandidateDetails from './components/CandidateDetails';
// import RequestVoter from './componenets/RequestVoter';
// import VerifyVoter from './components/VerifyVoter';
// import Vote from './components/Vote';
// import Admin from './components/Admin';
// import Result from './components/Result';

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/AddCandidate' component={AddCandidate} />
            {/* <Route path='/CandidateDetails' component={CandidateDetails}/>
            <Route path='/RequestVoter' component={RequestVoter}/>
            <Route path='/VerifyVoter' component={VerifyVoter}/>
            <Route path='/Vote' component={Vote}/>
            <Route path='/Result' component={Result}/>
            <Route path='/Admin' component={Admin}/>  */}
        </Switch>
    </Router>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
