import { Link } from "react-router-dom";
import "./Topbar.css";
import { useSelector } from "react-redux";

export default function Topbar() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            className="searchInput"
            placeholder="Search for friend , post or video "
          />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItems">
            <i className="fa-solid fa-user"></i>
            <span className="topbarIconbadge">1</span>
          </div>
          <div className="topbarIconItems">
            <i className="fa-solid fa-message"></i>
            <span className="topbarIconbadge">2</span>
          </div>
          <div className="topbarIconItems">
            <i className="fa-solid fa-bell"></i>
            <span className="topbarIconbadge">1</span>
          </div>
        </div>
        <Link to="/profile">
          <img src={currentUser.photo} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  );
}
