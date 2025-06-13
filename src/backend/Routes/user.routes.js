import { Router } from "express";
import userController from "../Controllers/user.controller.js";

const userRouter = Router();
const userControllers = new userController()

// Return all users
userRouter.get('/', (req, res) => {
    console.log("All users");
})

// Return the data of a user
// Parameters: ID of account to get
userRouter.get('/:id', (req, res) => {
    const {id} = req.params;
    console.log(`User info of ${id}`)
})

// Will create a new user
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
userRouter.delete('/:id', (req, res) => {
    console.log("Deleted a user")
})

export default userRouter