import "./Profile.css";
import Feed from "../../Components/feed/Feed";
import Rightbar from "../../Components/rightbar/Rightbar";
import Sidebar from "../../Components/sidebar/Sidebar";
import Topbar from "../../Components/topbar/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../Firebase";
import { userphoto } from "../../utils/connection";
import { toastOptions } from "../../utils/Validation";
import { updateImageSuccess } from "../../redux/user/slice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const fileref = useRef();
  const [file, setFile] = useState("");
  const [fileupload, setfileUpload] = useState();
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setfileUpload(downloadURL)
        );
      }
    );
  };
  const uploadImage = async () => {
    try {
      const res = await fetch(`${userphoto}/${currentUser._id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          photo: fileupload,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message, toastOptions);
        return;
      }
      dispatch(updateImageSuccess(data));
      toast.success("Image upload Successfully", toastOptions);
      setFile("");
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };
  return (
    <>
      <Topbar />

      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="https://images.unsplash.com/photo-1573126617899-41f1dffb196c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt=""
                className="profileCoverImg"
              />
              <input
                type="file"
                ref={fileref}
                hidden
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
              />
              <img
                src={fileupload || currentUser.photo}
                alt=""
                className="profileUserImg"
                onClick={() => fileref.current.click()}
              />
              {file === "" ? (
                ""
              ) : (
                <button onClick={uploadImage} className="uploadimage">
                  upload
                </button>
              )}
            </div>
            <p style={{ textAlign: "center" }}>
              {fileUploadError ? (
                <span style={{ color: "red" }}>
                  Error Image upload (image must be less than 2 mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span
                  style={{ fontWeight: "bold" }}
                >{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Image successfully uploaded!
                </span>
              ) : (
                ""
              )}
            </p>
            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser.username}</h4>
              <span className="profileInfoDesc">Hello my Freinds</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
