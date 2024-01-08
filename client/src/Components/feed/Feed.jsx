import React from 'react'
import Post from '../Post/Post'
import Share from '../share/Share'
import './feed.css'
import File from '../File/File'
export default function Feed() {
 
  return (
    <div className='feed'>
  <div className="feedWrapper">
       <Share/>
      {File.map((event,index)=>{
        return <Post
  
  key={event.id}
  post={event}
        
        
        />
      })}
     
  </div>

    </div>
  )
}
