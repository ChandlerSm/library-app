import express from "express";
import { PORT } from "../config/env.js";
import userRouter from "./Routes/user.Routes.js";
import authRouter from "./Routes/auth.routes.js";
import libraryRouter from "./Routes/library.routes.js";
import db from "./db.js";

const app = express();

// Set up the routes to be used.
app.use(express.json());
app.use("/v1/user", userRouter)
app.use("/v1/auth", authRouter)
app.use("/v1/library", libraryRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

export default app