import { Router } from "express";
import libraryController from "../Controllers/library.controller.js";
import { authorization } from "../Middleware/auth.middleware.js";

const libraryRouter = Router();
const libraryControllers = new libraryController()

libraryRouter.get("/", libraryControllers.getAllItems)

// Get the item by its id.
libraryRouter.get("/:id", libraryControllers.getItemById)

// Get an users items
libraryRouter.get("/user/:id", libraryControllers.getUsersItems)

// Create an item in the library, usable only by the item creator
libraryRouter.post("/:id", authorization, libraryControllers.createItem)

// Delete an item, usable only by the item creator
libraryRouter.delete("/:id/:itemId", authorization, libraryControllers.deleteItem)

// update an item, usable only by the item creator
libraryRouter.put("/:id/:itemId", authorization, libraryControllers.updateItem)

export default libraryRouter