import { useEffect, useState, useContext } from "react";
import { AllContext } from "../../context/contex.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export const Signin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AllContext);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`https://backend.jeelore.site/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,

        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });
      const res_data = await res.json();
      setError(res_data.error);
      if (res.ok) {
        setUserData({
          email: "",
          password: "",
        });
        authContext.setIsLoggedIn(true);
        toast("logged in successfully");
        navigate("/");
        setIsLoading(false);
      }
      setIsLoading(false);
      return res_data;
    } catch (error) {}
  };
  console.log(userData);

  return (
    <>
      <div className=" mx-auto  flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center align-middle w-5/6">
        <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block leading-6 text-white text-xl"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  onChange={handleInput}
                  autoComplete="email"
                  value={userData.email}
                  className="block bg-primary text-center w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-2xl focus:ring-2 focus:ring-inset  text-2xl sm:leading-6"
                />
              </div>
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
              <input type={showPassword ? "text" : "password"} name="password" value={userData.password} onChange={handleInput} className="grow" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 opacity-70"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl"/>}
              </svg>
            </label>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            
            <div>
              <button
                type="none"
                onClick={handleSignIn}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-white">
            Dont have an account?{" "}
            <NavLink
              to="/signup"
              className="font-semibold leading-6  text-indigo-500"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};
