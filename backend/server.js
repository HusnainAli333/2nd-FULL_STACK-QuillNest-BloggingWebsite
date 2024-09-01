import Express from "express";
import Mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./Routes/userRoutes.js";

const Server = Express();
const PORT = 3000;

Server.use(Express.json());
Server.use(cors());
Mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
});

Server.use("/api", userRoutes);

Server.listen(PORT, () => {
  console.log("listening on the port " + PORT);
});
