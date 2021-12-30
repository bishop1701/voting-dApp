import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {LinkStyle} from './styles'

class NavigationAdmin extends Component{
    render(){
        return(
            <div className='navbar'>
                <LinkStyle to ='/' className='heading'>HOME</LinkStyle>
                <LinkStyle to='/CandidateDetails'>CANDIDATES</LinkStyle>
                <LinkStyle to='/RequestVoter'>APPLY FOR VOTER</LinkStyle>
                <LinkStyle to='/Vote'>VOTE</LinkStyle>
                <LinkStyle to='/VerifyVoter'>VERIFY VOTER</LinkStyle>
                <LinkStyle to='/AddCandidate'>ADD CANDIDATE</LinkStyle>
                <LinkStyle to='/Result'>RESULTS</LinkStyle>
                <LinkStyle to='Admin'>START/END</LinkStyle>
            </div>
        )
    }
}

export default NavigationAdmin;