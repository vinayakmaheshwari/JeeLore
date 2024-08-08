import { json, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AllContext } from "../../context/contex";

export const Navbar = () => {
  const Context = useContext(AllContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    const res = await fetch(`https://backend.jeelore.site/api/auth/logout`, {
      credentials: "include",
      method: "POST",
    });

    if (res.ok) {
      Context.setIsLoggedIn(false);
      setIsLoading(false);
      toast("Logged out successfully");
    }
    setIsLoading(false);
  };
  console.log(process.env.NODE_ENV);
  return (
    <>
      <div className="navbar z-[1] bg-primary flex justify-between top-0 fixed h-10  border-accent border-b-2">
        <div className="w-40">
          <a className=" text-3xl font-bold">JeeLore</a>
        </div>
        <div className="">
          <div className="hidden md:flex"> 
          <ul className="menu md:flex-row flex-col menu-horizontal">
            <li>
              <NavLink to="/" className="text-xl font-bold">
                Solve
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/practice"} className="text-xl font-bold">
                Practice
              </NavLink>
            </li>
            <li className="text-xl font-bold">
              <NavLink to={"/upload"} className="nav-item">
                Upload
              </NavLink>
            </li>
            <li>
              <a
                href={"https://github.com/vinayakmaheshwari/JeeLore"}
                className="text-xl font-bold"
                target="_blank"
                rel="noreferrer"
              >
                Contribute
              </a>
            </li>

            <li>
              <NavLink 
                to="/leaderboard"
                className="text-xl font-bold"
              >
                Leaderboard
              </NavLink>
            </li>

            {!Context.isLoggedIn && (
              <>
                <li className="text-xl font-bold">
                  <NavLink to="/signin" className="text-xl font-bold nav-item">
                    SignIn
                  </NavLink>
                </li>
                <li className="text-xl font-bold">
                  <NavLink to="/signup" className="text-xl font-bold nav-item">
                    SignUp
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {Context.isLoggedIn && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-15 rounded-full border border-accent">
                  <img alt="PFP"
                   src={Context.auth.profileImg}
                  
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-xl border border-accent dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between text-lg">{Context.auth.userName}</a>
                </li>
                {/* <li>
                  <NavLink to="/settings" className="text-lg">Settings</NavLink>
                </li> */}
                <li>
                  <a onClick={handleLogout} className="text-lg">
                    {isLoading ? "Logging out..." : "Logout"}
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
};
