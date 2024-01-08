import "./auth.css";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../Firebase";
import { userGoogle } from "../../utils/connection";
import { useDispatch } from "react-redux";
import { SignupSuccess } from "../../redux/user/slice";
import { useNavigate } from "react-router-dom";
import { toastOptions } from "../../utils/Validation";
import { toast } from "react-toastify";
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    try {
      const res = await fetch(userGoogle, {
        method: "POST",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, toastOptions);

        return;
      }
      dispatch(SignupSuccess(data));
      navigate("/");
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  return (
    <button className="googleButton " onClick={googleClick}>
      Continue with google
    </button>
  );
};

export default Auth;
