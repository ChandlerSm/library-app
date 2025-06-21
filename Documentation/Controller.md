# Auth.controller.js
- The controller to handle the functions for authentication/authorization

## signUp
- Will create a new user in the user database.
- Parameters:
  - username: name of the new user
  - password: password of the new user
- On success will return status code 200
- On failure will return status code 500
- On existing user alreadt will return 409

## signIn
- Will sign into the specified user and will return a JWT
- Parameters:
  - username: name of the user
  - password: password of the user
- On success will return status code 200 and a JWT
- On failure will return status code 500
- Or will return status code 401/404 if issues with passwords.

# user.controller.js
- The controller to handle the functions for the user

## users
- Will return a list of all users in the user db
- Status codes:
  - 200 (success)
  - 404 (not found)
  - 500 (Server error)

## getUser
- Will return the specific information of a user (requires authorization)
- Parameter:
  - id: id of the user
- Status Codes:
  - 200 (success)
  - 404 (not found)
  - 500 (Server error)

## deleteUser
- Will delete a user (requires authorization)
- Parameter:
  - id: id of the user
- Status Codes:
  - 200 (success)
  - 404 (Not Found)
  - 500 (Server Error)

## updateUser
- Will update a user's username (requires authorization)
- Parameter:
  - id: id of the user
  - username: username to update to
- Status Codes: 
  - 200 (success)
  - 404 (Not Found)
  - 500 (Server Error)

# library.controller.js
- The controller to handle functions of the library.

## GetAllItems
- Will return all the items in the library database.
- Status Codes:
  - 200 (success)
  - 404 (Not Found)
  - 500 (Server Error)

## GetItemById
- Will return an item specified by it's id
- Parameters:
  - id: Item's id
- Status Codes:
  - 200 (success)
  - 404 (Not Found)
  - 500 (Server Error)
  - 400 (Item is empty)

## GetUsersItems
- Will return a user's list of personal items in the library
- Parameters:
  - id: User's id
- Status Codes:
  - 200 (success)
  - 404 (Not Found)
  - 500 (Server Error)

## createItem
- Will create an item in the library (requires authorization)
- Parameters:
  - id: id of the user to post item to
  - Body:
    - name: name of item
    - description: text to describe the item
    - imageURL: URL linking to the uploaded image
    - rating: whole number rating of the item
- Status Codes:
  - 200 (Success)
  - 400 (Missing fields or could not upload item)
  - 500 (Server Error)

## deleteItem
- Will delete an item in the library (requires authorization)
- Parameters:
  - id: id of the current user
  - itemId: id of the item to be deleted
- Status Codes:
  - 200 (Success)
  - 404 (Not Found)
  - 500 (Server Error)

## updateItem
- Will update the fields of an item
- Parameters:
  - id: id of the current user
  - itemId: id of the item to update
  - Body:
    - name: name of item
    - description: text to describe the item
    - imageURL: URL linking to the uploaded image
    - rating: whole number rating of the item
- Status Codes:
  - 200 (Success)
  - 404 (Not Found)
  - 500 (Server Error)