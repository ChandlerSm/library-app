# auth.middleware.js

## Description

This middleware function protects sensitive endpoints by verifying the JWT token sent in the `Authorization` header. It:

* Extracts the JWT token from the `Authorization` header (`Bearer <token>` format).
* Verifies the token using the secret key.
* Checks that the token’s user ID matches the ID in the request parameters.
* Queries the database to confirm the user exists.
* Attaches the user object to `req.user` for downstream handlers.
* Returns appropriate HTTP status codes and messages on failure.

---

## Usage

Include this middleware on routes that require authorization, for example:

```js
import { authorization } from '../Middleware/auth.middleware.js';

router.get('/user/:id', authorization, getUser);
```

---

## Behavior

* If no token is provided, returns:

  ```json
  401 Unauthorized
  {
    "message": "Unauthorized"
  }
  ```

* If token is invalid or IDs do not match:

  ```json
  401 Unauthorized
  {
    "message": "Unauthorized, unmatching IDs."
  }
  ```

* If user not found in database:

  ```json
  401 Unauthorized
  {
    "message": "Unauthorized: User not found"
  }
  ```

* On database errors:

  ```json
  500 Internal Server Error
  {
    "message": "Database error"
  }
  ```

* On successful authorization, `req.user` is populated and `next()` is called.
