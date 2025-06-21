import { config } from "dotenv";

config({path: '.env'});
export const { PORT, JWTSECRETTOKEN, testtoken } = process.env;