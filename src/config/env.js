import { config } from "dotenv";

config({path: '.env'});
export const { PORT, JWTSECRETTOKEN } = process.env;