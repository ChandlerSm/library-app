import { Router } from "express";
import {signIn, signUp} from "../Controllers/auth.controller.js";

const authRouter = Router();

// API for signing in account, will use jwtoken to return a log in token
// Body: 
// {
//    "username": "username",
//    "password": "password"
// }
authRouter.post('/sign-in', signIn)

// API for creating an account, will user bcrpyt to encrypt the password
// Body: 
// {
//    "username": "username",
//    "password": "password"
// }
authRouter.post('/sign-up', signUp)

export default authRouter