import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css'

class Vote extends Component{
	constructor(props) {
		super(props)
		this.state = {
			url: this.props.url,
			contract: this.props.contract,
			voter:'',
			id:''
		}
	}
	
	async componentWillMount() {
		await this.loadContract()
	}

	async loadContract() {
		const web3 = new Web3(this.state.url)
		const contract = new web3.eth.Contract(this.props.contract_abi,this.props.contract_address)
		this.setState({contract:contract})
	}

	getID = (event)=>{
		event.preventDefault()
		this.setState({id:event.target.value})
	}

	getAccount = (event)=>{
		event.preventDefault()
		this.setState({voter:event.target.value})
	}

	onSubmit = (event)=>{
		event.preventDefault()
		const contract = this.state.contract
		contract.methods.voteImage(this.state.id).send({from:this.state.voter},(error,result)=>{
			if(error){
				console.log(error)
				alert("Vote not casted")
			}
			else{
				alert("Vote Successfully Given")
			}
		})
	}

	render(){
		return(
			<div className="container">
				<h2>Vote Picture</h2>
				<form method="post" onSubmit={this.onSubmit}>
					<input type="text" placeholder="Enter picture ID number" onChange={this.getID} />
					<input type="text" placeholder="Enter your address" onChange={this.getAccount} />
					<input type="submit" />
				</form>
			</div>
			)
	}
}

export default Vote;