import React from 'react';

const UserCard = ({
  name, profileImgUrl
}) => {

  return (
    <div className="UserCard">
      <div>
      Welcome {name}
      </div>
      <div className="profileImg">
        <img src={profileImgUrl} width="30"></img>
      </div>
    </div>
  )
}

export default UserCard;