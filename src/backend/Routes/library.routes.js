import { Router } from "express";
import libraryController from "../Controllers/library.controller.js";

const libraryRouter = Router();
const libraryControllers = new libraryController()

libraryRouter.get("/", libraryControllers.getAllItems)

libraryRouter.get("/:id", (req, res) => {
    const {id} = req.params
    res.status(200).json({message: `All items of user ${id}`})
})

libraryRouter.post("/:id", (req, res) => {
    res.status(200).json({message: `Created item for user ${id}`})
})

libraryRouter.delete("/:id/:item", (req, res) => {
    const {id, itemID} = req.params
    res.status(200).json({message: `Deleted item ${itemID} for user ${id}`})
})

libraryRouter.put("/:id", (req, res) => {
    const {id} = req.params
    res.status(200).json({message: `Updated item for item ${id}`})
})

export default libraryRouter