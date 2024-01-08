import { useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import Feed from "../../Components/feed/Feed";
import Rightbar from "../../Components/rightbar/Rightbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import Topbar from "../../Components/topbar/Topbar";
import { useSelector } from "react-redux";
export default function home() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (currentUser === null) {
      navigate("/register");
    }
  }, []);
  return (
    <>
      <Topbar />

      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
