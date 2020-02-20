
import React from 'react';

const Artist = ({
  name,img
}) => {

  return (
    <div className="Artist">
      <div>
      {name} <img className="albumArt" src={img}/>
      </div>
    </div>
  )
}

export default Artist;