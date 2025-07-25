import db from '../db.js'

// Get all users
export const users = async (req, res, next) => {
    try {
        db.all("SELECT * FROM users", (err, row) => {
            if (err) return res.status(404).json({Message: "Error getting users."})

            return res.status(200).json({message: "Successfully got all users.", users: row})
        })
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error."})
    }
}

// Get a specific user
// Parameters:
// id: user id
export const getUser = async (req, res) => {
 try {
    db.all("SELECT username, role, id FROM users WHERE id = ?", [req.params.id], (err, row) => {
        if (err) return res.status(404).json("User not found.")
        res.status(200).json({message: "User successfully found.", user: row[0]})
    })
 } catch (err) {
    return res.status(500).json({message: "Internal Server Error."})
 }
}

// Delete a user from the database
// Parameter:
// userId: id of the user
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        db.run("DELETE FROM users WHERE id = ?", [userId], (err) => {
            if (err) return res.status(404).json({message: "Could not find/delete user."})
            return res.status(200).json({message: `Successfully deleted user ${userId}`})
        })
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error."})
    }
}


// Update a user's info, just username for now
// Parameter:
// id: ID of the user
// username: Text to update username to
export const updateUser = async (req, res) => {
    try {
        const { id, username } = req.params
        db.run("UPDATE users SET username = ? WHERE id = ?", [username, id], (err) => {
            if (err) return res.status(404).json({message: "Could not update user details."})
            return res.status(200).json({message: `Successfully updated username of ${id}`})
        })
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error."})
    }
}