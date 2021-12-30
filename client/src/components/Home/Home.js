import React, { Component } from "react";
import getWeb3 from "../../getWeb3";
import SmartContract from "../../contracts/SmartContract.json";

import NavigationAdmin from '../NavigationAdmin';
import Navigation from '../Navigation';
import {Button} from '../button.style.js'

class Home extends Component {
  constructor(props){
    super(props)
  
  this.state = { // set the state of this component..
     SmartContract: undefined, 
     account: null,
     web3: null,
     isOwner:false 
    };

  }

  componentDidMount = async () => {
    if(!window.location.hash){
      window.location = window.location + '#loaded';
      window.location.reload();
    } // will refresh the page on each time when loaded, for better development purposes so that web3 will be loaded constantly.

    try {

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SmartContract.networks[networkId];
      const instance = new web3.eth.Contract( // contract instance.
        SmartContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({SmartContract: instance, web3: web3, account: accounts[0]})

      const owner = await this.state.SmartContract.methods.getOwner().call(); // get from this instance, if the wallet is owner or not.
      if(this.state.account == owner){
        this.setState({isOwner: true});
      }

      let start = await this.state.SmartContract.methods.getStart().call();
      let end = await this.state.SmartContract.methods.getEnd().call();
      this.setState({start: start, end: end});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if(!this.state.web3){
      return(
       <div className="CandidateDetails">
         <div className="CandidateDetails-title">
           <h1>
           Loading Web3, accounts, and contract..
           </h1>
         </div>
         {this.state.isOwner? <NavigationAdmin/> : <Navigation/>}
       </div>
      )
    }
    return (
      <div classname="App">
        <div className="CandidateDetails">
          <div classname="CandidateDetails-title">
            <h1>
              ADMIN PORTAL
            </h1>
          </div>
        </div>
        {this.state.isOwner? <NavigationAdmin/> : <Navigation/>}

        <div className="home">
          WELCOME TO VOTING SYSTEM
          <div>
            Made by Anthony Lynn
          </div>
        </div>
      </div>
     
    );
  }
}

export default Home;
