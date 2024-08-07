import { useState, useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import { AllContext } from "../../context/contex";
export const Setting = () => {
  const navigate = useNavigate();
  const pfpUpload = useRef(null);
  const [pfpImage, setPfpImage] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCvGZvoVQc9RCra5dB-yneBsEGSx5vdkKeQ&s");
  const authContext = useContext(AllContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const handlePfpImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPfpImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInput = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const res = await fetch(`api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          userName: userData.userName,
          email: userData.email,
          password: userData.password,
          profileImg: pfpImage
        }),
      });
      const res_data = await res.json();
      
      setError(res_data.error);

      if (res.ok) {
        setUserData({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
        
        });
        authContext.setIsLoggedIn(true);
        toast("Account created successfully")
        navigate('/')
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      
    }
  };

  return (
    <>
      <div className="mx-auto flex h-[100%] bg-white  items-center w-full">
      
        <div className="flex w-full ">
         <div className="bg-accent  self-start justify-center items-center h-full w-1/4 flex flex-col sm:mx-auto sm:w-full sm:max-w-sm">
           <img src={pfpImage} alt="img" className="w-5/6 border-white border-2 h-5/6 rounded-full "/>
           <button className="btn btn-primary border border-white mt-5 hover:bg-primary">Change Profile Picture</button>
         </div>
          <div className="w-3/4 h-full">
            <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Profile
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};
