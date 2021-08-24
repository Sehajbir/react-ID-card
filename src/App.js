import React, { Component, useState } from 'react'
import './App.css'
import {IoOpenOutline} from 'react-icons/io5'
import {AiFillMail, AiFillPhone, AiFillInfoCircle} from 'react-icons/ai'
import {GrFormRefresh} from 'react-icons/gr'
import Modal from './components/Modal'

export class App extends Component {

  constructor(){
    super();
    this.state = {
      results : {},
      picture : "",
      lat: "",
      long: "",
      isLoading : true,
      showModal : false
    }
  }

  componentDidMount(){
    fetch('https://randomuser.me/api/').then(response => response.json()).then(data => this.displayAndSetData(data));
  }

  displayAndSetData(data){
    var results = [];
    results = data.results;
    var picture = results[0].picture;
    var loc = results[0].location
    this.setState({results : results[0], picture: picture.large, lat: loc.coordinates.latitude, long : loc.coordinates.longitude, isLoading: false});
    
  }

  displayName(){
    var name = this.state.results.name;
    var output = "";
    if(name)
      output = name.title + " " + name.first + " " + name.last;
    return output;
  }

  displayStreetLocation(){
    var loc = this.state.results.location;
    if(loc){
      var output = loc.street.number + " " + loc.street.name + ", ";
      return output;
    }
  }
  displayLocation(){
    var loc = this.state.results.location;
    if(loc){
      var output = loc.city + ", " + loc.state + ", " + loc.country;
      return output;
    }
  }

  mapSearchString(){
    var loc = this.displayLocation();
    var locArr = loc.split(' ');
    var output = '';
    for(var l in locArr){
      output = output + locArr[l] + "+";
    }
    return output.substr(0, output.length-1);
  }

  getAge(){
    var temp = this.state.results.dob;
    if(temp){
      return temp.age + " years";
    }
  }

  memberSince(){
    var temp = this.state.results.registered;
    if(temp){
      var output = temp.date;
      output = temp.date.substr(0, temp.date.indexOf("T"));
      return output;
    }
  }

  setShow(temp){
    this.setState({showModal : temp});
  }

  render() {
    const {isLoading} = this.state;
    const {showModal} = this.state;
    if(isLoading)
      return <p>Loading ... </p>

    return (
      <>
        <div className="App">
          <div className="card">
            <div>
              <img src={this.state.picture} alt="profileImg" className="profileImg" />
            </div>
            <br/>
            <h1>{this.displayName()}</h1>
            <p>{this.displayStreetLocation()}</p>
            <p>{this.displayLocation()}  <IoOpenOutline className="icon" onClick={(e) => {window.open("https://maps.google.com/?q="+ this.mapSearchString() )}} /></p>
            <p>Age : {this.getAge()}</p>
            <div className="links-wrapper">
              <p className="links"><AiFillMail className="icon" /> {this.state.results.email}</p>
              <p className="links"><AiFillPhone className="icon" />{this.state.results.cell}</p>
            </div>
            <div className="footer">
              <p>Member Since : {this.memberSince()}</p>
            </div>
            <div className="refersh">
              <GrFormRefresh className="icon refresh" onClick={(e) => {window.location.reload()}}/>
            </div>
            <div className="rawInfo">
              <AiFillInfoCircle className="icon rawInfo" onClick={() => this.setShow(true)}/>
            </div>
          </div>
        </div>
        <Modal show={showModal} onClose={() => this.setShow(false)} data={this.state.results}/>
      </>
    )
  }
}

export default App
