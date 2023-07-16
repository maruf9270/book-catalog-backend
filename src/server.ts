import mongoose from "mongoose";
import config from "./config";
import { Server } from "http";
import app from "./app";

let server: Server;
const port = process.env.PORT || config.port;
const databaseConnection = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database connected successfully");
    server = app.listen(port, () => {
      console.log(`Your server is running on port :${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

databaseConnection();
