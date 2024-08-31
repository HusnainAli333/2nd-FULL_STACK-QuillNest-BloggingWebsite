import AnimationWrapper from "../../common/animationWrapper/AnimationWrapper";
import InputBox from "../../components/inputbox/InputBox";
import googleicon from "../../imgs/google.png";
import { Link } from "react-router-dom";

function UserAuth({ type }) {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-In" ? "welcome back" : "join us today"}
          </h1>
          {type !== "sign-In" ? (
            <InputBox
              name="fullName"
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
          <button className="btn-dark center mt-14 " type="submit">
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
