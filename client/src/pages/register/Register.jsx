import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  SignupFailure,
  SignupProcess,
  SignupSuccess,
} from "../../redux/user/slice";
import { useState } from "react";
import { userSignup } from "../../utils/connection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupValidation } from "../../utils/Validation";
import { toastOptions } from "../../utils/Validation";
import Auth from "../../Components/Auth/Auth";
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (signupValidation(form)) {
        dispatch(SignupProcess());
        const res = await fetch(userSignup, {
          method: "POST",
          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(SignupFailure(data.message));
          toast.error(data.message, toastOptions);
          return;
        }
        dispatch(SignupSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(SignupFailure(error.message));
      toast.error(error.message, toastOptions);
    }
  };
  return (
    <div className="Register">
      <div className="RegisterWrapper">
        <div className="RegisterLeft">
          <h3 className="RegisterLogo">Social</h3>
          <span className="RegisterDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="RegisterRight">
          <form onSubmit={handelSubmit} className="RegisterBox">
            <input
              type="text"
              placeholder="Username"
              className="RegisterInput"
              name="username"
              value={form.username}
              onChange={handelChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="RegisterInput"
              name="email"
              value={form.email}
              onChange={handelChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="RegisterInput"
              name="password"
              value={form.password}
              onChange={handelChange}
            />
            <input
              type="password"
              placeholder="ConfirmPassword"
              className="RegisterInput"
              name="confirmpassword"
              value={form.confirmpassword}
              onChange={handelChange}
            />
            <button type="submit" className="RegisterButton">
              {loading ? <span className="loader"></span> : "Sign Up"}
            </button>
          </form>
          <Auth />
          <Link to="/login">
            <p className="RegisterloginButton">Already have an Account !</p>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
