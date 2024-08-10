import { json, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AllContext } from "../../context/contex";
import { TiThMenu } from "react-icons/ti";

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

  return (
    <>
      <div className="navbar z-[1] bg-primary flex  top-0 fixed h-10  border-accent border-b-2">
        <div className="dropdown dropdown-start lg:hidden ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <TiThMenu className="text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-xl border-r border-b border-l mt-2 border-accent self-start dropdown-content bg-primary z-[1] w-52 p-2 shadow"
          >
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
              <NavLink to="/leaderboard" className="text-xl font-bold">
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
        </div>

        <div className="flex justify-between w-full">
          <div className="lg:hidden"> </div>
          <div className="flex self-center justify-center lg:justify-start ">
            <a className="text-3xl font-bold self-center">JeeLore</a>
          </div>
          <div className="self-end absolute hidden lg:flex lg:relative">
            <ul className="menu lg:flex-row flex-col menu-vertical lg:menu-horizontal hidden lg:top-[inherit] ">
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
                <NavLink to="/leaderboard" className="text-xl font-bold">
                  Leaderboard
                </NavLink>
              </li>

              {!Context.isLoggedIn && (
                <>
                  <li className="text-xl font-bold">
                    <NavLink
                      to="/signin"
                      className="text-xl font-bold nav-item"
                    >
                      SignIn
                    </NavLink>
                  </li>
                  <li className="text-xl font-bold">
                    <NavLink
                      to="/signup"
                      className="text-xl font-bold nav-item"
                    >
                      SignUp
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          {Context.isLoggedIn && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-15 rounded-full border border-accent">
                  <img alt="PFP" src={Context.auth.profileImg} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-xl border border-accent dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between text-lg">
                    {Context.auth.userName}
                  </a>
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
    </>
  );
};
