import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateComponent = () => {
  const { currentUser } = useSelector((state) => state.user);
  return <>{currentUser ? <Outlet /> : <Navigate to="/register" />}</>;
};

export default PrivateComponent;
