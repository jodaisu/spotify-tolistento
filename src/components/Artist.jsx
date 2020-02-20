
import React from 'react';

const Artist = ({
  key, name
}) => {

  return (
    <div className="Artist">
      <div>
      {key}. {name}
      </div>
    </div>
  )
}

export default Artist;