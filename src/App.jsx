import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

import User from './components/User';
import TopArtists from './components/TopArtists';
import TopTracks from './components/TopTracks';

class App extends Component{
  constructor(props) {
    super(props);

    this.state = {
      access_token : '',
      refresh_token: ''
    };

    this.getHashParams = this.getHashParams.bind(this);
  }

  getHashParams(){
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    // console.log(hashParams)
    return hashParams;
  }

  componentWillMount() {
    // get hash params
    const params = this.getHashParams();
    this.state.access_token = params.access_token;
    this.state.refresh_token = params.refresh_token;
  }

  render(){
    // main login page
    if (!this.state.access_token){
      return (
        <div className="login">
          <a href="/login">login to spotify</a>
        </div>
      )
    }

    // if user has access token, render APP
    else {
      return (
        <div className="App">
          <User 
            access_token={this.state.access_token}
          />
          <div className="Top">
            <TopArtists
              access_token={this.state.access_token}
            />
            <TopTracks
              access_token={this.state.access_token}
            />
          </div>
        </div>
      );
    }
  }
}

export default hot(module)(App);