import React, { useState } from "react";
import "./Post.css";
export default function Post({ post, props }) {
  const [state, setState] = useState(post.like);

  const [condition, setCondition] = useState(true);
  const [condition2, setCondition2] = useState(true);
  const click = () => {
    condition ? setState(state + 1) : setState(state - 1);
    setCondition(!condition);
  };
  const button = () => {
    condition2 ? setState(state + 1) : setState(state - 1);
    setCondition2(!condition2);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={post.profile} alt="" className="postProfileImg" />
            <span className="postUsername">{post.name}</span>
            <span className="postDate">{post.time} ago</span>
          </div>
          <div className="postTopRight">
            <i class="fa-sharp fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.about}</span>
          <img src={post.image} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <span>
              <i
                class="fa-solid likeIcon fa-heart"
                onClick={button}
                style={condition2 ? { color: "black" } : { color: "red" }}
              ></i>
            </span>
            <span className="postLikeCounter">{state} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.Comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
