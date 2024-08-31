import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import UserAuth from "./pages/userAuth/UserAuth";

function App() {
  return (
    <BrowserRouter>
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
