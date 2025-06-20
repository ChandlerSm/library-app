import db from "../db.js"

export default class libraryController {
    // Function to get all the items in the library db
    getAllItems = async (req, res) => {
        try {
        db.all("SELECT * FROM library", (err, row) => {
            if (err) return res.status(404).json({message: "Could not get library items."})
            return res.status(200).json({message: "Successfully pulled all items in library", library: row})
        })
        } catch (err) {
            return res.status(500).json({message: "Internal Server Error."})
        }
    }

    // Function to get an item in the library by its id
    // Params: The id of the item
    getItemById = async (req, res) => {
        try {
            const {id} = req.params
            db.all("SELECT * FROM library WHERE id = ?", [id], (err, row) => {
                if (err) return res.status(404).json({message: "Item not found."})
                if (!row) return res.status(400).json({message: "Item is empty."})
                return res.status(200).json({message: "Found item", item: row})
            })
        } catch (err) {
            return res.status(500).json({message: "Internal Server Error."})
        }
    }

    // Function to get a user's items
    // Params: The id of the user
    getUsersItems = async (req, res) => {
        try {
            const {id} = req.params
            db.all("SELECT * FROM library WHERE posterID = ?", [id], (err, row) => {
                if (err) return res.status(404).json({message: "Item not found."})
                return res.status(200).json({message: "Found user's items", items: row})
            })
        } catch (err) {
            return res.status(500).json({message: "Internal Server Error."})
        }
    }

    // Create an item in the library db for a user
    // Parameters: 
    // id: User's Id
    // JSON Body: name, description, imageURL, rating
    createItem = async (req, res) => {
        try {
            const {id} = req.params
            const { name, description, imageURL, rating } = req.body

            if (!name || !description || !imageURL || !rating || !id) {
                return res.status(400).json({ message: "Missing required fields." });
            }

            db.run("INSERT INTO library (name, description, imageURL, posterID, rating) VALUES (?, ?, ?, ?, ?)", [name, description, 
                imageURL, id, rating], (err) => {
                    if (err) return res.status(400).json({message: "Could not upload item."})
                    return res.status(200).json({message: "Successfully posted the item."})
                })
        } catch (err) {
            return res.status(500).json({message: "Internal Server Error."})
        }
    }

    // Delete an item in the library
    // Parameters: 
    // id: The id of the user
    // itemId: id of the item to be deleted
    deleteItem = async (req, res) => {
        try {
            const {id, itemId} = req.params
            db.run("DELETE FROM library WHERE id = ? AND posterID = ?", [itemId, id], (err) => {
                if (err) return req.status(404).json({message: "Could not delete item."})
                return res.status(200).json({message: "Deleted the item."})
            })
        } catch (err) {
            return res.status(500).json({message: "Internal Server Error."})           
        }
    }

    // Update a user's item
    // Parameter:
    // id: The id of the user
    // itemId: id of the item to be updated
    // JSON Body:
    // name: name to be updated
    // description: description text update
    // imageURL: updated image URL
    // rating: updated rating
    updateItem = async (req, res) => {
        try {
            const {id, itemId} = req.params
            const {name, description, imageURL, rating} = req.body
            db.run("UPDATE library SET name = ?, description = ?, imageURL = ?, rating = ? WHERE id = ? AND posterID = ?", [name, description,
            imageURL, rating, itemId, id], (err) => {
                if (err) return req.status(404).json({message: "Could not update item."})
                return res.status(200).json({message: "Successfully updated the item."})
            })
        } catch (err) {
            return res.status(500).json({message: "Internal Server Error."})           
        }
    }
}

