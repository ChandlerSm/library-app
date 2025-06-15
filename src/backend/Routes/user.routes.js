import { Router } from "express";
import {getUser, users, deleteUser} from "../Controllers/user.controller.js"
import { authorization } from "../Middleware/auth.middleware.js";

const userRouter = Router();

// Return all users
userRouter.get('/', (req, res) => {
    console.log("All users");
})

// Return the data of a user
// Parameters: ID of account to get
userRouter.get('/:id', authorization, getUser);

// Will create a new user, more for dev purposes not user use
userRouter.post('/', (req, res) => {
    console.log("Created a user")
})

// Will update an account
// Parameters: ID of account to update
userRouter.put('/:id', (req, res) => {
    console.log("Updated user account")
})

// Will delete a user
// Parameters: ID of account to delete
userRouter.delete('/:id', authorization, deleteUser);

export default userRouter