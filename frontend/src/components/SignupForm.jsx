import { useState, useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import { AllContext } from "../../context/contex";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export const Signup = () => {
  const navigate = useNavigate();
  const pfpUpload = useRef(null);
  const [pfpImage, setPfpImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqCvGZvoVQc9RCra5dB-yneBsEGSx5vdkKeQ&s"
  );
  const authContext = useContext(AllContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      const res = await fetch(`https://backend.jeelore.site/api/auth/signup`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          userName: userData.userName,
          email: userData.email,
          password: userData.password,
          profileImg: pfpImage,
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
        toast("Account created successfully");
        navigate("/");
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <>
      <div className="mx-auto flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 w-5/6">
        <div className="mt-14 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Create a new account
          </h2>
        </div>

        <div className="mt-5 justify-center flex flex-col  sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6 justify-center flex flex-col ">
            <div className=" w-full h-full  flex flex-col  items-center">
              <div className="w-24  border border-gray-600 h-24 rounded-full bg-primary flex justify-center items-center">
                <img
                  onClick={() => pfpUpload.current.click()}
                  className="w-full h-full rounded-full"
                  src={pfpImage}
                  alt=""
                />
              </div>
              <input
                onChange={handlePfpImgChange}
                className="hidden"
                ref={pfpUpload}
                type="file"
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block font-medium leading-6 text-white text-xl"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={userData.firstName}
                  onChange={handleInput}
                  autoComplete=""
                  className="block bg-primary text-center w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-2xl focus:ring-2 focus:ring-inset  text-2xl sm:leading-6"
                />
              </div>
              {!userData.firstName && (
                <p className="text-red-600">First Name is required</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block font-medium leading-6 text-white text-xl"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={userData.lastName}
                  autoComplete=""
                  onChange={handleInput}
                  className="block bg-primary text-center w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-2xl focus:ring-2 focus:ring-inset  text-2xl sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="userName"
                className="block font-medium leading-6 text-white text-xl"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  value={userData.userName}
                  onChange={handleInput}
                  autoComplete="none"
                  className="block bg-primary text-center w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-2xl focus:ring-2 focus:ring-inset  text-2xl sm:leading-6"
                />
              </div>
              {!userData.userName && (
                <p className="text-red-600">User Name is required</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-white text-xl"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={userData.email}
                  onChange={handleInput}
                  autoComplete="email"
                  className="block bg-primary text-center w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-2xl focus:ring-2 focus:ring-inset  text-2xl sm:leading-6"
                />
              </div>
              {!userData.email && (
                <p className="text-red-600">Email is required</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-medium leading-6 text-white text-xl"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <label className="input border border-slate-300 input-bordered bg-primary flex items-center gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={userData.password}
                    onChange={handleInput}
                    className="grow"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 opacity-70"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-xl" />
                    ) : (
                      <FaEye className="text-xl" />
                    )}
                  </svg>
                </label>
              </div>
              {!userData.password && (
                <p className="text-red-600">Password is required</p>
              )}
              {error && <p className="text-red-600 text">{error}</p>}
            </div>

            <div>
              <button
                onClick={handleSignUp}
                className="flex w-full justify-center rounded-md bg-accent hover:bg-accent/75 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Loading..." : "Sign up"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-white">
            Already have an account?{" "}
            <NavLink
              to="/signin"
              className="font-semibold leading-6  text-accent hover:text-accent/75"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};
