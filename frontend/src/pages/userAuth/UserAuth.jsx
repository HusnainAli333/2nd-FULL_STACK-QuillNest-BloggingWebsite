import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../../common/animationWrapper/AnimationWrapper";
import InputBox from "../../components/inputbox/InputBox";
import googleicon from "../../imgs/google.png";
import axios from "axios";

import { storeSession } from "../../utils/sessionFunctions";
import { useAuthContext } from "../../context/AuthContext";

function UserAuth({ type }) {
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useAuthContext();

  const apiSignSignUp = type === "sign-In" ? "/signin" : "/signup";

  async function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(formElement);
    let formData = {};
    for (let [key, values] of form.entries()) {
      formData[key] = values;
    }
    const { fullname, email, password } = formData;

    // VALIDATION

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (fullname) {
      if (fullname.length <= 3) {
        return toast.error("name should be at least 3 characters long");
      }
    }
    if (!email.length) {
      return toast.error("Enter email");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Please Enter a valid email");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password should be 6-20 digits characters long with a  1 numeric , 1 lowercase and 1 uppercase "
      );
    }

    try {
      const Data = await axios.post(
        import.meta.env.VITE_API_MAIN + apiSignSignUp,
        formData
      );
      if (Data) {
        storeSession("user", JSON.stringify(Data.data));
        setUserAuth(Data);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form id="formElement" className="w-[80%] max-w-[400px]" key={type}>
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-In" ? "welcome back" : "join us today"}
          </h1>
          {type !== "sign-In" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="full Name"
              icon="fi-ss-user"
            />
          ) : (
            ""
          )}
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-sr-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-sr-key"
          />
          <button
            className="btn-dark center mt-14 "
            type="submit"
            onClick={handleSubmit}
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold ">
            <hr className="w-1/2 border-black " />
            <p>or</p>
            <hr className="w-1/2 border-black " />
          </div>
          <div className="lg:flex items-center justify-center gap-5">
            <button className="btn-dark flex items-center justify-center gap-4">
              <img src={googleicon} alt="google" className="w-5" />
              Continue With Google
            </button>

            {type === "sign-In" ? (
              <p className="mt-6 text-dark-grey text-l text-center">
                Dont't have an account ?
                <Link to="/signup" className="underline text-black text-l ml-1">
                  Join us today
                </Link>
              </p>
            ) : (
              <p className="mt-6 text-dark-grey text-l text-center">
                Already have an account ?
                <Link to="/signin" className="underline text-black text-l ml-1">
                  log in here
                </Link>
              </p>
            )}
          </div>
        </form>
      </section>
    </AnimationWrapper>
  );
}

export default UserAuth;
