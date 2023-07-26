"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    database_url: process.env.DATABASE_URL,
    node_env: process.env.NODE_ENVIROMENT,
    port: process.env.port,
    salt_rounds: process.env.SALT_ROUNDS,
    refreash_secret: process.env.REFREASH_SECREAT,
    refreash_expire: process.env.REFREASH_EXPIRE,
    auth_secret: process.env.AUTH_SECRET,
    auth_expire: process.env.AUTH_EXPIRE,
};
