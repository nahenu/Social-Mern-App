import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogin } from "../../utils/connection";
import {
  LoginFailure,
  LoginProcess,
  LoginSuccess,
} from "../../redux/user/slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginValidator } from "../../utils/Validation";
import { toastOptions } from "../../utils/Validation";
import Auth from "../../Components/Auth/Auth";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loginValidator(form)) {
        dispatch(LoginProcess());
        const res = await fetch(userLogin, {
          method: "POST",
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(LoginFailure(data.message));
          toast.error(data.message, toastOptions);
          return;
        }
        dispatch(LoginSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(LoginFailure(error.message));
      toast.error(error.message, toastOptions);
    }
  };
  return (
    <>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Social</h3>
            <span className="loginDesc">
              Connect with friends and the world around you on Lamasocial.
            </span>
          </div>
          <div className="loginRight">
            <form action="" className="loginBox" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="loginInput"
                name="email"
                onChange={handleChange}
                value={form.email}
              />
              <input
                type="password"
                placeholder="Password"
                className="loginInput"
                name="password"
                onChange={handleChange}
                value={form.password}
              />
              <button type="submit" className="loginButton">
                {loading ? <span className="loader"></span> : "Log In"}
              </button>
            </form>
            <Auth />
            <Link to="/register">
              <p className="loginRegisterButton">Create a New Account !</p>
            </Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
