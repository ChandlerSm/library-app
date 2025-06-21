# auth.routes.js

## POST `/v1/auth/sign-in`

**Description:**
Authenticate a user and return a JSON Web Token (JWT) for authorized access.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

* `200 OK` — Returns an object containing the JWT token.
* `401 Unauthorized` — Invalid username or password.

---

## POST `/v1/auth/sign-up`

**Description:**
Create a new user account. Passwords are securely hashed using bcrypt.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

* `201 Created` — Account successfully created.
* `400 Bad Request` — Username already exists or invalid input.

# library.routes.js

Base URL: `/v1/library`

---

## GET `/v1/library`

**Description:**
Retrieve all items in the library.

**Auth:** None required.

**Response:**

* `200 OK` — Returns a JSON object with all library items.
* `404 Not Found` — If no items found or an error occurs.

---

## GET `/v1/library/:id`

**Description:**
Retrieve a single library item by its ID.

**Parameters:**

* `id` (path param) — ID of the item to retrieve.

**Auth:** None required.

**Response:**

* `200 OK` — Returns the requested item data.
* `404 Not Found` — If the item with specified ID does not exist.

---

## GET `/v1/library/user/:id`

**Description:**
Retrieve all items that belong to a specific user.

**Parameters:**

* `id` (path param) — User ID whose items to fetch.

**Auth:** None required.

**Response:**

* `200 OK` — Returns an array of the user's items.
* `404 Not Found` — If no items found or user does not exist.

---

## POST `/v1/library/:id`

**Description:**
Create a new library item. Only the authenticated user with matching ID can create items.

**Parameters:**

* `id` (path param) — ID of the user creating the item.

**Auth:** Required (JWT token, authorization middleware).

**Request Body:**

```json
{
  "name": "string",
  "description": "string",
  "rating": "number",
  "imageURL": "string"
}
```

**Response:**

* `201 Created` — Item successfully created.
* `401 Unauthorized` — If user is not authorized.
* `400 Bad Request` — If required data is missing or invalid.

---

## DELETE `/v1/library/:id/:itemId`

**Description:**
Delete a library item. Only the authenticated user who owns the item can delete it.

**Parameters:**

* `id` (path param) — User ID.
* `itemId` (path param) — ID of the item to delete.

**Auth:** Required (JWT token, authorization middleware).

**Response:**

* `200 OK` — Item successfully deleted.
* `401 Unauthorized` — If user is not authorized.
* `404 Not Found` — If item does not exist.

---

## PUT `/v1/library/:id/:itemId`

**Description:**
Update a library item. Only the authenticated user who owns the item can update it.

**Parameters:**

* `id` (path param) — User ID.
* `itemId` (path param) — ID of the item to update.

**Auth:** Required (JWT token, authorization middleware).

**Request Body:**

```json
{
  "name": "string",
  "description": "string",
  "rating": "number",
  "imageURL": "string"
}
```

**Response:**

* `200 OK` — Item successfully updated.
* `401 Unauthorized` — If user is not authorized.
* `400 Bad Request` — If update data is invalid.
* `404 Not Found` — If item does not exist.

# user.routes.js

Base URL: `/v1/user`

---

## GET `/v1/user/`

**Description:**
Get a list of all users.

**Auth:** None required.

**Response:**

* `200 OK` — Returns a JSON array of users.
* `404 Not Found` — If no users found or an error occurs.

---

## GET `/v1/user/:id`

**Description:**
Get information for a specific user by ID.

**Parameters:**

* `id` (path parameter) — User ID.

**Auth:** Required (JWT token, authorization middleware).

**Response:**

* `200 OK` — Returns the user data.
* `401 Unauthorized` — If no or invalid token provided.
* `404 Not Found` — If user with the given ID does not exist.

---

## PUT `/v1/user/:id/:username`

**Description:**
Update a user’s username.

**Parameters:**

* `id` (path parameter) — User ID.
* `username` (path parameter) — New username.

**Auth:** Required (JWT token, authorization middleware).

**Response:**

* `200 OK` — Username updated successfully.
* `401 Unauthorized` — If no or invalid token provided.
* `404 Not Found` — If update fails or user not found.

> ⚠️ Note: It is recommended to send updates via JSON body rather than URL params for better RESTful design.

---

## DELETE `/v1/user/:id`

**Description:**
Delete a user by ID.

**Parameters:**

* `id` (path parameter) — User ID to delete.

**Auth:** Required (JWT token, authorization middleware).

**Response:**

* `200 OK` — User deleted successfully.
* `401 Unauthorized` — If no or invalid token provided.
* `404 Not Found` — If user not found or deletion failed.