import React, { Component } from 'react';

import Track from './Track';

// this component populates User Information from their Spotify Account
// fetch Spotify data here

class TopTracks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      access_token : props.access_token,
      tracksData : []
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
        tracksData : data.items
      })

      console.log(data)
    })
    .catch(err => console.log('getDetails: ERROR: ', err));
  }


  componentDidMount(){
    this.getTopTracks(this.props.access_token)
    
  }

  render(){
  
    return(
    <div className="TopTracks">
      {this.state.tracksData.map((item, index) => <Track key={`track${index}`} name={item.name} img={item.album.images[2].url}/>)}
    </div>
    )
  }
}


export default TopTracks;