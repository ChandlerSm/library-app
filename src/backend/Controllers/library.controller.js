import db from "../db.js"

export default class libraryController {
    getAllItems = (req, res, next) => {
        db.all("SELECT * FROM library", (err, row) => {
            if (err) return res.status(404).json({message: "Could not get library items."})
            return res.status(200).json({message: "Successfully pulled all items in library", library: row})
        })
    }

    signIn(username, password) {
        console.log("Function sign in")
    }
}

