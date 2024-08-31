import Express from "express";

import { userSignIn, userSignUp } from "../controllers/userController.js";

const userRoutes = Express.Router();

userRoutes.post("/signin", userSignIn);

userRoutes.post("/signup", userSignUp);

export default userRoutes;
