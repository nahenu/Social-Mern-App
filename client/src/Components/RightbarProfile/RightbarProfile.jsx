import React from 'react'

export default function RightbarProfile({rightbarprofile}) {
  return (
    <>
    
    <div className="rightbarFollowing">
      <img src={rightbarprofile.image} alt="" className="rightbarFollowingImg" />
      <span className='rightbarFollowingName'>{rightbarprofile.name}</span>
    </div>
    </>
  )
}
