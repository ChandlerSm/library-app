import db from '../db.js'

export const users = async (req, res, next) => {
    
}

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