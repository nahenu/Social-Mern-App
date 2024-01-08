import Online from '../Online/Online'
import './rightbar.css'
import { rightbarUser, user } from '../File/File'
import RightbarProfile from '../RightbarProfile/RightbarProfile'
import Feed from '../feed/Feed'
export default function Rightbar({profile}) {


  const HomeRightbar=()=>{
    return(
    <>
    <div className="birthdayContainer">
<img src='https://www.transparentpng.com/thumb/gift/19vBsz-gift-png-picture.png'alt="" className='birthdayImg'  />
<span className='birthdayText'> <b> Pola Foster</b> and <b>3 other friends</b>  have a birthday today</span>

  </div>
<img src="https://images.dailyhive.com/20210809101848/unnamed.jpg" alt=""  className='rightbarAd'/>
<h4 className='rightbarTitle Online'>Online Friends</h4>
<ul className="rightbarFriends">
{user.map((value)=>{
  return <Online
  key={value.id}
  user={value}
  />
})}
</ul>

    </>
    )
  }
  const ProfileRightbar=()=>{
    return (<>
   <h4 className='rightbarTitle'>User Information</h4>
   <div className="rightbarInfo">
    <div className="rightbarInfoItem">
      <span className="rightbarInfoKey">City:</span>
      <span className="rightbarInfoValue">New York</span>
    </div>
    <div className="rightbarInfoItem">
      <span className="rightbarInfoKey">From:</span>
      <span className="rightbarInfoValue">Madrid</span>
    </div>
    <div className="rightbarInfoItem">
      <span className="rightbarInfoKey">Relationship:</span>
      <span className="rightbarInfoValue">Single</span>
    </div>
   </div>
   <h4 className='rightbarTitle'>User friends</h4>
   <div className="rightbarFollowings">
    {rightbarUser.map((event)=>{
    return <RightbarProfile
    key={event.id}
    rightbarprofile={event}
    />
    })}
   </div>

    </>
    )
    
  }
  return (
    <div className='rightbar'>
 <div className="rightbarwrapper">


 <ProfileRightbar/>
 <HomeRightbar/>
 </div>
      
    </div>
  )
}
