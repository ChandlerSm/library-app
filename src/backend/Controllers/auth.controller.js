import bcrypt from 'bcrypt'
import jwttoken from 'jsonwebtoken'
import db from '../db.js'
import { JWTSECRETTOKEN } from '../../config/env.js'

// Logic for signing up.
// Body: 
// {
//    "username": "username",
//    "password": "password"
// }
export const signUp = async (req, res, next) => {
    try {
        const {username, password} = req.body
        
        if (!username || !password) return res.status(401).json({message: "Missing username or password"})

        // Check if user exists
        db.all("SELECT * FROM users WHERE username = ?", [username], async (err, rows) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }

            if (rows.length > 0) {
                return res.status(409).json({ error: "User already exists" }); // Better: 409 Conflict
            }

            // User doesn't exist, proceed to hash password
            try {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);

                // Insert user into DB
                db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashPassword], function (err) {
                    if (err) {
                        return res.status(500).json({ error: "Database error during insert" });
                    }

                    return res.status(201).json({ message: `Signed up user ${username}`, userId: this.lastID });
                });
            } catch (hashErr) {
                return res.status(500).json({ error: "Error while hashing password" });
            }
        });
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
}

// Logic for signing in. Will set a jwt to return in the status to store for log in.
// Body: 
// {
//    "username": "username",
//    "password": "password"
// }
export const signIn = async (req, res, next) => {
    try {

        const {username, password} = req.body

        if (!username || !password) return res.status(401).json({message: "Missing username or password"})


        db.all("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
            if (err) return res.status(500).json({ error: "Database error" })
            bcrypt.compare(password, user[0].password, (err, isMatch) => {
                if (err) return res.status(401).send("Error comparing passwords");

                if (isMatch) {
                    const token = jwttoken.sign({username: user.username, id: user.id}, JWTSECRETTOKEN)
                    return res.status(200).json({message: "Logged in", token: token})
                } else {
                    return res.status(404).send("Incorrect password");
                }
            })
        })
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong" });
    }
}


