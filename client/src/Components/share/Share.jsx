import React from "react";
import "./share.css";
import { useSelector } from "react-redux";
export default function Share() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={currentUser.photo} alt="" className="shareProfileImg" />
          <input
            placeholder={`what's in your mind ${currentUser.username}?`}
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <i class="fa-solid fa-photo-film shareIcon"></i>
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <i class="fa-solid fa-tag shareIcon"></i>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <i class="fa-solid fa-location-dot shareIcon"></i>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <i class="fa-solid fa-face-smile shareIcon"></i>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="sharebutton">Share</button>
        </div>
      </div>
    </div>
  );
}
