import React from 'react';

const ToListenTo = props => (
      <div>
      <h1>ToListenTo List</h1>
      <p>Artist</p><input id="field" type="text" onChange=
        {event => {
          props.newArtist(event.target.value)
          }} value={props.clear}>
        
        </input><button onClick={() => this.props.addArtist(this.props.id)}>Add Artist</button>
    </div>
);

export default ToListenTo;