
import React from 'react';

const Track = ({
  name, img
}) => {

  return (
    <div className="Track">
      <div>
      {name} <img className="albumArt" src={img}/>
      </div>
    </div>
  )
}

export default Track;