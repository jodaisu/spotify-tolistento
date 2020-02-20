import React, { Component } from 'react';

import Artist from './Artist';

// this component populates User Information from their Spotify Account
// fetch Spotify data here

class TopArtists extends Component {
  constructor(props) {
    super(props)


    this.state = {
      access_token : props.access_token,
      artistNames : []
    }
  }

  
  getTopArtists(token){
    console.log('Try to get Artists Info')
    fetch('https://api.spotify.com/v1/me/top/artists', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ 
        artistNames : data.items
      })

      // console.log(data)
    })
    .catch(err => console.log('getDetails: ERROR: ', err));
  }


  componentWillMount(){
    this.getTopArtists(this.props.access_token)
    
  }


  render(){

    return(
    <div className="TopArtists">
      {this.state.artistNames.map((item, index) => <Artist key={`artist${index}`} name={item.name} img={item.images[2].url}/>)}
    </div>
    )
  }
}


export default TopArtists;