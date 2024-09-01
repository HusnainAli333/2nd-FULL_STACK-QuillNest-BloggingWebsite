import { Link } from "react-router-dom";
import AnimationWrapper from "../../common/animationWrapper/AnimationWrapper";
import { useAuthContext } from "../../context/AuthContext";
import { removeSession } from "../../utils/sessionFunctions";

function UserNavigationPanel() {
  const {
    userAuth: { username },
    setUserAuth,
  } = useAuthContext();

  function handleSignOut() {
    removeSession("user");
    setUserAuth({ access_token: null });
  }
  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50 "
    >
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4 ">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>
        <Link to={`/user/${username}`} className="link pl-8 py-4">
          Profile
        </Link>
        <Link to="/dashboard/blogs" className="link pl-8 py-4">
          Dashboard
        </Link>
        <Link to="/settings/edit-profile" className="link pl-8 py-4">
          Settings
        </Link>
        <span className="absolute border-t border-grey  w-[100%]"></span>
        <button
          className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
          onClick={handleSignOut}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
}

export default UserNavigationPanel;
