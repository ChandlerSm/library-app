# app.js

## Description
- Initializes and connects to the server and also makes sure all routes are connectable

- Routes:
  - app.use("/v1/user", userRouter)
  - app.use("/v1/auth", authRouter)
  - app.use("/v1/library", libraryRouter)

- PORT:
  - Will connect to port specified in the .env, pullable from env.js