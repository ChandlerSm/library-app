import bcrypt from 'bcrypt'
import jwttoken from 'jsonwebtoken'
import db from '../db.js'
import { JWTSECRETTOKEN } from '../../config/env.js'


// Authorize a jwtoken whenever a request is made to a data sensitive endpoint.
export const authorization = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) return res.status(401).json({message: "Unauthorized"})

        const decoded = jwttoken.verify(token, JWTSECRETTOKEN)

        // Check if token id and your id match.
        if (decoded.id != req.params.id) return res.status(401).json({message: "Unauthorized, unmatching IDs."})

        // Find user in db, then will return user if it exists
        db.get(
            'SELECT username, id FROM users WHERE username = ? AND id = ?',
            [decoded.username, decoded.id],
            (err, user) => {
                if (err) {
                    return res.status(500).json({ message: "Database error" });
                }

                if (!user) {
                    return res.status(401).json({ message: "Unauthorized: User not found" });
                }

                req.user = user;
                next();
            }
        );
    } catch (err) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}