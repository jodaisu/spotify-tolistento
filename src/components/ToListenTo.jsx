import React from 'react';

const ToListenTo = props => (
      <div>
      <h1>ToListenTo List</h1>
      <p>Artist</p><input id="field" type="text" onChange=
        {event => {
          props.updateArtist(event.target.value)
          }} value={props.clear}>
        
        </input><button onClick={() => props.addArtist(props.id, props.newArtist)}>Add Artist</button>
    </div>
);

export default ToListenTo;