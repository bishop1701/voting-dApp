import React, {Component} from "react";
import SmartContract from "../contracts/SmartContract.json";
import getWeb3 from "../getWeb3";

import {FormGroup, FormControl, Button, Alert} from 'react-bootstrap';
import NavigationAdmin from "./NavigationAdmin";
import Navigation from "./Navigation";
import {ButtonStyle} from "./button.style"

class AddCandidate extends Component{
    constructor(props){
        super(props)

        this.state = {
            SmartContract: undefined,
            account: null,
            web3:null,
            name:'',
            party:'',
            manifesto:'',
            constituency:'',
            candidates: null,
            isOwner:false
        }
    }

    componentDidMount = async () => {

        // load page once.
        if(!window.location.hash){
            window.location = window.location + '#loaded';
            window.location.reload();
        }
        try{
            // get network provider..
            const web3 = await getWeb3();

            // get user accounts with web3
            const accounts = await web3.eth.getAccounts();

            //get contract instance
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SmartContract.networks[networkId];
            const instance =  new web3.eth.Contract(
                SmartContract.abi,
                deployedNetwork && deployedNetwork.address
            );

            //set state
            this.setState({SmartContract: instance, web3:web3,account:accounts[0]});
            const owner = await this.state.SmartContract.methods.getOwner().call();

            if(this.state.account === owner){
                this.setState({isOwner:true});
            }
        } catch(error){
            alert(
                'Failed to load web3, accounts or contract. Check console for details'
            );
            console.error(error);
        }
    }

    updateName = event => {
        this.setState({name: event.target.value});
    }

    updateParty = event => {
        this.setState({party: event.target.value})
    }

    updateManifesto = event => {
        this.setState({manifesto: event.target.value})
    }

    updateConstituency = event => {
        this.setState({constituency: event.target.value})
    }

    addCandidate = async () => {
         await this.state.SmartContract.methods.addCandidate(
            this.state.name,
            this.state.party,
            this.state.manifesto,
            this.state.constituency)
            .send({
                from: this.state.account,
                gas:1000000
            });
            alert('Success!')
            //Reload 
            window.location.reload(false);
    }

    render(){
        if(!this.state.web3){
            return(
                <div className="CandidateDetails">
                    <div className="CandidateDetails-title">
                        <h1>Loading web3, accounts, and contract..</h1>
                    </div>
                    {this.state.isOwner? <NavigationAdmin/> : <Navigation/>}
                </div>
            );
        }

        if(!this.state.isOwner){
            return(
                <div className="CandidateDetails">
                    <div className="CandidateDetails-title">
                        <h1>
                            ONLY ADMIN CAN ACCESS
                        </h1>
                    </div>
                    {this.state.isOwner? <NavigationAdmin/> : <Navigation/>}
                </div>
            );
        }

        return (
            <div className="App">
                <div className="CandidateDetails">
                    <div className="CandidateDetails-title">
                        <h1>
                            Add Candidate
                        </h1>
                    </div>
                </div>
                {this.state.isOwner? <NavigationAdmin/> : <Navigation/>}

                <div className="form">
                    <FormGroup>
                        <div className="form-label">Enter Name - </div>
                        <div className="form-input">
                            <FormControl
                            input= 'text'
                            value= {this.state.name}
                            onChange={this.updateName} />
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <div className="form-label">Enter Constituency Number</div>
                        <div className="form-input">
                            <FormControl 
                            input='textArea'
                            value= {this.state.party}
                            onChange={this.updateParty} />
                        </div>
                    </FormGroup>
                    <Button onClick={this.addCandidate} className="button-vote">
                        Add
                    </Button>
                </div>
            </div>
        )
    }
}

export default AddCandidate;