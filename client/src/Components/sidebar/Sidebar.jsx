import React from "react";
import "./sidebar.css";
import { userLogout } from "../../utils/connection";
import { useNavigate } from "react-router-dom";
import { userLogoutSuccess } from "../../redux/user/slice";
import { useDispatch } from "react-redux";
import { sidebarFriendList, sidebarListItems } from "../File/File";
export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = async () => {
    try {
      const res = await fetch(userLogout);
      const data = await res.json();
      console.log(data);
      dispatch(userLogoutSuccess());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {sidebarListItems.map((e) => {
            return (
              <li className="sidebarListItems" key={e.id}>
                <i className={e.icon}></i>
                <span className="sidebarListItemText">{e.desc}</span>
              </li>
            );
          })}
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarhr" />

        <ul className="sidebarFriendList">
          {sidebarFriendList.map((e) => {
            return (
              <li className="sidebarFriend" key={e.id}>
                <img src={e.image} alt="" className="sidebarFriendImg" />
                <span className="sidebarFriendName">{e.name}</span>
              </li>
            );
          })}
          <li
            className="sidebarListItems"
            style={{
              display: "flex",
              gap: "5px",
              fontWeight: "bold",

              width: "5.6rem",
              cursor: "pointer",
            }}
            onClick={logOut}
          >
            <span class="material-symbols-outlined">logout</span>
            <span className="sidebarListItemText">Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
