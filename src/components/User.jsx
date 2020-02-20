import React, { Component } from 'react';

import UserCard from './UserCard';

// this component populates User Information from their Spotify Account
// fetch Spotify data here

class User extends Component {
  constructor(props) {
    super(props)


    this.state = {
      access_token : props.access_token,
      name : "",
      profileImgUrl : ""
    }
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
        profileImgUrl : data.images[0].url
      })

      // console.log(data)
    })
    .catch(err => console.log('getDetails: ERROR: ', err));
  }

  componentWillMount(){
    this.getUserInfo(this.props.access_token)
    
  }


  render(){
    // convert image object to string
    
    return(
    <div className="User">

      <UserCard 
        name={this.state.name}
        profileImgUrl={this.state.profileImgUrl}
      />
    </div>
    )
  }
}


export default User;