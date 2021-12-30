import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ButtonStyle, LinkStyle} from './styles'

class Navigation extends Component{
    render(){
        return(
            <div className='navbar'>
                <LinkStyle to ='/' className='heading'>HOME</LinkStyle>
                <LinkStyle to='/CandidateDetails'>CANDIDATES</LinkStyle>
                <LinkStyle to='RequestVoter'>APPLY FOR VOTER</LinkStyle>
                <LinkStyle to='/Vote'>VOTE</LinkStyle>
            </div>
        )
    }
}

export default Navigation;