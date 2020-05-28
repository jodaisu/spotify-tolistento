import React from "react";

const Artist = ({ name, img }) => {
  return (
    <div className="Artist">
      <div>
        <h1>Top Artists</h1>
        <p>hello</p>
        {name} <img className="albumArt" src={img} />
      </div>
    </div>
  );
};

export default Artist;
