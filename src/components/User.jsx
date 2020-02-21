import React, { Component } from 'react';

import UserCard from './UserCard';
import ToListenTo from './ToListenTo';
// this component populates User Information from their Spotify Account
// fetch Spotify data here

class User extends Component {
  constructor(props) {
    super(props)


    this.state = {
      access_token : props.access_token,
      name : "",
      profileImgUrl : "",
      id : 0,
      addArtist : this.addArtist(),
      newArtist : ''
    }

    this.addArtist = this.addArtist.bind(this)
    this.updateArtist = this.updateArtist.bind(this)
  }

  // insert query with this invocation
  // need this.state.newArtist



  addArtist(id, newArtist) {
    console.log(`attempt to fetch ${id} ${newArtist}`)
    fetch('/addArtist', {
    method: 'POST',
    headers: {
      "Content-Type": "Application/JSON"
    },
    body: JSON.stringify({
      clientId : id,
      artistName : newArtist
    }),
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    // console.log(data);
  });
  }

  // listener for onChange
  updateArtist (text) {
    // set state on change
    this.setState({
      newArtist : text
    })
    console.log(this.state.newArtist)
  }
  
  getUserInfo(token){
    console.log('Try to get User Info')
    fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      // body: JSON.stringify({ token }),
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ 
        name : data.display_name.split(' ')[0],
        profileImgUrl : data.images[0].url,
        id : data.id,
      })

      console.log(data)
    })
    .catch(err => console.log('getDetails: ERROR: ', err));
  }

  componentWillMount(){
    this.getUserInfo(this.props.access_token)
    
  }

  // make a request to populate the database using this.state.id
  componentDidMount() {
    
  }


  render(){
    // convert image object to string
    
    return(
    <div className="User">

      <UserCard 
        name={this.state.name}
        profileImgUrl={this.state.profileImgUrl}
      />

      <ToListenTo 
        id={this.state.id}
        addArtist = {this.addArtist}
        updateArtist = {this.updateArtist}
        newArtist = {this.state.newArtist}
      />

    </div>
    )
  }
}


export default User;