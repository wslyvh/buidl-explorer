import * as dotenv from "dotenv";

dotenv.config();

export const ServerConfig = {
  NODE_ENV: process.env.NODE_ENV,

  GITHUB_TOKEN: process.env.REACT_APP_GITHUB_TOKEN || "",
};