import { useState } from "react";

function InputBox({ name, type, id, value, icon, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />
      <i className={"fi " + icon + " input-icon"}></i>
      {type === "password" ? (
        <i
          className={
            (showPassword ? "fi-sr-eye-crossed " : "fi fi-ss-eye ") +
            " input-icon left-[auto] right-4 cursor-pointer"
          }
          onClick={() => setShowPassword((e) => !e)}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
}

export default InputBox;
