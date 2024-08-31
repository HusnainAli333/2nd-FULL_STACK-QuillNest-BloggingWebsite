import Bcrypt from "bcrypt";
import User from "../Schema/User.js";
import { nanoid } from "nanoid";
import Jwt from "jsonwebtoken";
import "dotenv/config";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

async function generateUserName(email) {
  let username = email.split("@")[0];

  const isUserNameUnique = await User.exists({
    "personal_info.username": username,
  }).then((u) => u);

  isUserNameUnique ? (username = username + nanoid().substring(0, 5)) : "";

  return username;
}

function formatData(user) {
  const access_token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return {
    access_token,
    profileImg: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
}

async function userSignUp(req, res) {
  const { fullName, email, password } = req.body;
  console.log(fullName);
  //VALIDATION

  if (fullName.length <= 3) {
    return res
      .status(403)
      .json({ error: "name should be at least 3 characters long" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Enter email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Please Enter a valid email" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6-20 digits characters long with a  1 numeric , 1 lowercase and 1 uppercase ",
    });
  }

  Bcrypt.hash(password, 10, async (err, hashed_password) => {
    const username = await generateUserName(email);

    const user = new User({
      personal_info: {
        fullname: fullName,
        email,
        password: hashed_password,
        username,
      },
    });

    user
      .save()
      .then((u) => {
        return res.status(200).json(formatData(u));
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(500).json({
            erro: "Email Already exist",
          });
        }

        return res.status(500).json({
          error: err,
        });
      });
  });
}

async function userSignIn(req, res) {
  const { email, password } = req.body;

  try {
    const userEmailFound = await User.findOne({ "personal_info.email": email });
    if (!userEmailFound) {
      return res.status(403).json({ error: "Email not found" });
    }
    Bcrypt.compare(
      password,
      userEmailFound.personal_info.password,
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Some Error Occured Try Again" });
        }
        if (!result) {
          return res
            .status(500)
            .json({ error: "Incorrect Password Try Again" });
        } else {
          return res.status(200).json(formatData(userEmailFound));
        }
      }
    );
  } catch (error) {
    return res.status(201).json({ error: "Some Error Occured Try Again" });
  }
}

export { userSignIn, userSignUp };
