import React, { Component } from 'react';
import './App.css';
import Image from "./Image"
import Web3 from 'web3'
import ImageHashes from '../abis/ImageHashes.json'
import Vote from './Vote'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host:'ipfs.infura.io', port:5001,protocol:'https'})

const ganache_url = 'HTTP://127.0.0.1:7545'
class App extends Component { 

  constructor(props){
    super(props)
    this.state={
      account:'',
      buffer:'',
      contract:'',
      contract_abi:'',
      contract_address:'',
      count:0,
      list:[[0,'QmT1VftRBrnUQxnXKAC3tf8ZgAwbbb2fdo5UaKgnKiGVeR']],
      loading: true
    }
  }

  async componentWillMount() {
    await this.laodBlockchain()
    await this.loadHashData()
  }
  async loadHashData() {
    const cont = this.state.contract
    var count 
    cont.methods.getCount().call({from:this.state.address},(error,result)=>{
      if(error)
        console.log(error)
      else{
        count = parseInt(result)
        console.log("Loaded count: ",count)
        for(let i=0;i<count;i++){
          cont.methods.getHash(i).call({from:this.state.address},(error,result)=>{
            if(error)
              console.log(error)
            else {
              console.log("th result",i,result)
              this.state.list.push([i+1,result])
            }
          })
        }
        this.setState({count:count+1})
      } 
    })
    this.setState({loading:false})  
  }

  async laodBlockchain() {
    const web3 = new Web3(ganache_url)
    const networkId = await web3.eth.net.getId()
    const networkData = ImageHashes.networks[networkId]

    if(networkData) {
      console.log("Connected to proper Blockchain network")
      const abi = ImageHashes.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi,address)
      if(contract){
        this.setState({contract:contract})
        this.setState({contract_address:address})
        this.setState({contract_abi:abi})
      }
      else{
        alert("Contract not loaded")
      }
    }
    else{
      alert("Connected to wrong network")
    }
  }

  getAccount = (event)=>{
    event.preventDefault()
    this.setState({account: event.target.value})
  }

  getFile = (event)=>{
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = ()=>{
      this.setState({buffer:Buffer(reader.result)})
    }
  }

  onSubmit = (event)=>{
    event.preventDefault()
    console.log("Working")
    ipfs.add(this.state.buffer,(err,res)=>{
      console.log("IPFS working...")
      if(err){
        alert("IPFS giving error")
        console.log("Error in IPFS: ",err)
      }
      else{
        var hash = res[0].hash
        var c = parseInt(this.state.count)
        this.state.list.push([c,hash])
        this.state.contract.methods.addImage(hash).send({from:this.state.account,gas:1000000},(error,result)=>{
          if(error){
            alert("Error in updating: ")
            console.log("Error in updating:",error)
          }
          else{
            console.log("Transaction Hash: ",result)
            alert("Upload Success")
          }
        })
        this.setState({count:c+1})
      }
    })
  }


  render() {
    if(this.state.loading){
      return(
        <div>
          <h1>LOADING</h1>
        </div>
      )
    }
    else {
      return (
        <div>
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <a
              className="navbar-brand col-sm-3 col-md-2 mr-0"
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              My Gallery
            </a>
          </nav>
          <br/>
          <br/>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Image list={this.state.list} />
          </div>
          <br />
          <br />
          <div className="container">
            <h2>Upload Picture</h2>
            <form method="post" onSubmit={this.onSubmit}>
              <input type="file" onChange={this.getFile} />
              <input type="text" placeholder="Enter account address" onChange={this.getAccount} />
              <input type="submit" />
            </form>
          </div>
          <br />
          <Vote url={ganache_url} contract_address={this.state.contract_address} contract_abi={this.state.contract_abi} /> 
        </div>
      );
    }
    }
}

export default App;
