import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENVIROMENT,
  port: process.env.port,
  salt_rounds: process.env.SALT_ROUNDS,
  refreash_secret: process.env.REFREASH_SECREAT,
  refreash_expire: process.env.REFREASH_EXPIRE,
  auth_secret: process.env.AUTH_SECRET,
  auth_expire: process.env.AUTH_EXPIRE,
};
