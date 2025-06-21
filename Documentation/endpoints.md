# 📂 Endpoints

## Auth
- `POST /v1/auth/register` – Create new user
- `POST /v1/auth/login` – Login and receive JWT

## Users
- `GET /v1/user` - Get all user's
- `GET /v1/user/:id` – Get user info (auth required)
- `DELETE /v1/user/:id` – Delete user (auth required)
- `PUT /v1/user/:id/:username` - Update a user's username (auth required)

## Library Items
- `GET /v1/library` – Get all items
- `GET /v1/library/:id` – Get item by ID
- `POST /v1/library/:id` – Add item (auth required)
- `DELETE /v1/library/:id/:itemId` - Delete an item (auth required)
- `PUT /v1/library/:id/:itemId`, - Update the info of an item (auth required)