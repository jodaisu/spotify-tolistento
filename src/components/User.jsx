import React, { Component } from 'react';

// this component provides User Information from their Spotify Account
// fetch Spotify data here

class User extends Component {
  constructor(props) {
    super(props)


    this.state = {
      access_token : props.access_token,
      userInfo : {}
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
      console.log(data)
    })
    .catch(err => console.log('getDetails: ERROR: ', err));
  }

  componentWillMount(){
    this.getUserInfo(this.props.access_token)
  }


  render(){

    return(
    <div className="User">
      This is the user container for user {this.state.access_token}
    </div>
    )
  }
}


export default User;