import { Link, Outlet } from "react-router-dom";
import logo from "../../imgs/logo-no-background.png";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import UserNavigationPanel from "../userNavigation/UserNavigationPanel";

function Navbar() {
  const [searchBoxVisible, setSearchBoxVisible] = useState();
  const [userPanel, setUserPanel] = useState(false);

  const {
    userAuth: { access_token, profileImg },
  } = useAuthContext();

  return (
    <>
      <div className="navbar">
        <Link to="/" className="w-[8%] flex-none">
          <img src={logo} alt="logo of inktales" />
        </Link>
        <div
          className={
            "absoulte bg-white w-full left-0 top-full mt-05 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchBoxVisible ? "show" : "hide")
          }
        >
          <input
            type="text"
            placeholder="search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12 "
          />
          <i className="fi fi-rr-search absolute right-[25%] md:pointer-events-none md:left-6 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center "
            onClick={() => setSearchBoxVisible((c) => !c)}
          >
            <i className="fi fi-rr-search text-xl "></i>
          </button>
          <Link to="/editor" className="hidden md:flex gap-2 link">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link>

          {access_token ? (
            <>
              <Link to="/dashboard/notification">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-2xl block mt-1 "></i>
                </button>
              </Link>

              <div className="relative" onClick={() => setUserPanel((c) => !c)}>
                <button className="w-12 h-12 mt-1">
                  <img
                    src={profileImg}
                    alt="profile immg"
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
                {userPanel && <UserNavigationPanel />}
              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark py-2" to="signin">
                Sign In
              </Link>
              <Link className="btn-light py-2 hidden md:block" to="signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
