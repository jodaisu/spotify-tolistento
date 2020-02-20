import React, { Component } from 'react';

// import TopArtistsCard from './TopArtistsCard';

// this component populates User Information from their Spotify Account
// fetch Spotify data here

class TopTracks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      access_token : props.access_token,
      TopTracks : []
    }
  }

  
  getTopTracks(token){
    console.log('Try to get Tracks Info')
    fetch('https://api.spotify.com/v1/me/top/tracks', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ 
        TopTracks : data
      })

      // console.log(data)
    })
    .catch(err => console.log('getDetails: ERROR: ', err));
  }


  componentWillMount(){
    this.getTopTracks(this.props.access_token)
    
  }


  render(){
  
    return(
    <div className="TopTracks">
      TopTracks HERE
    </div>
    )
  }
}


export default TopTracks;