import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useAuthContext } from "./context/AuthContext";
import UserAuth from "./pages/userAuth/UserAuth";
import { getSession } from "./utils/sessionFunctions";

function App() {
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useAuthContext();

  console.log(access_token);
  useEffect(() => {
    let userInSession = getSession("user");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/signin" element={<UserAuth type="sign-In" />} />
          <Route path="signup" element={<UserAuth type="sign-Up" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
