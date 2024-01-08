import PrivateComponent from "./Components/PrivateComponent";
import Profile from "./Components/Profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/error/Error";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
