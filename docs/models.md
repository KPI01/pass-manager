# Models

## User

Model that represents a user who can authenticate to the application.

### Fields

| Field          |   Type    | Description                                       |
| :------------- | :-------: | :------------------------------------------------ |
| id             |  integer  | Unique record identifier.                         |
| created_at     | timestamp | Date and time the record was created.             |
| updated_at     | timestamp | Date and time the record was updated.             |
| name           |  string   | User's name.                                      |
| email          |  string   | User's email address.                             |
| password       |  string   | Encrypted password.                               |
| remember_token |  string   | Remembered token for login.                       |
| role_id        |  integer  | Identifier of the role to which the user belongs. |

### Relationships

- `role`: defines to which role belongs the user.

## Role

Model that represents the role the user plays within the application. This will allow you to authorize or deny the different actions the user attempts to perform.

### Fields

| Field      |   Type    | Description                         |
| :--------- | :-------: | :---------------------------------- |
| id         |  integer  | Unique identifier.                  |
| created_at | timestamp | Date and time the role was created. |
| updated_at | timestamp | Date and time the role was updated. |
| name       |  string   | Name of the role.                   |
| short      |  string   | Short name of the role.             |

### Relationships

- `users`: relations that define which users belongs to each role.

### Ideas

- Add a `permissions` field that contains a json and the specific permissions for the role

## Register

A resource that represents a record stored within the application; this can be a user or email account.

### Fields

| Field       |   Type    | Description                           |
| :---------- | :-------: | :------------------------------------ |
| id          |  integer  | Unique identifier for the record.     |
| created_at  | timestamp | Date and time the record was created. |
| updated_at  | timestamp | Date and time it was updated.         |
| description |  string   | Description of the record.            |
| type        |   enum    | Record type. ('user','email')         |
| login       |  string   | Username or email address.            |
| password    |  string   | Current encrypted password.           |
| notes       |   text    | Additional notes about the record.    |
| owner_id    |  integer  | Identifier of the record owner.       |

### Relationships

- `owner`: defines who has created the record so that it will belong to that user.
- `changes`: keep record of changes made for the record

### Methods

Customized methods that were declared to implement advanced functionality.

#### Setters

- `setLoginAttribute`: encrypts the value before being saved on the database.
- `setPasswordAttribute`: encrypts the value before being saved on the database.

#### Getters

- `getLoginAttribute`: returns the login attribute decrypted.

### Routes

It uses the resource model of Laravel with a few adjustments.

- `GET: index`: shows a table with all the records that can see the user.
- `POST: store`: creates a new record.
- `DELETE: destroy`: deletes a record.
- `PUT|PATCH: update`: updates a record.
- `POST: reveal-password`: endpoint that retrieves the password decrypted.
- `POST: check-can-update`: validates from the front-end if an user can update a register.
- `POST: get-changes`: endpoint that retrieves all changes made to a specific register.

## Change

Model that represents a history of changes to stored records.

### Fields

| Field       |   Type    | Description                                                    |
| :---------- | :-------: | :------------------------------------------------------------- |
| id          |  integer  | Unique identifier for the record.                              |
| created_at  | timestamp | Date and time the record was created.                          |
| made_by     |  integer  | Identifier of the user who made the change.                    |
| register_id |  integer  | Identifier of the modified record.                             |
| action      |   enum    | Action performed on the record. ('creation','update','delete') |
| old         |  string   | Old value of the modified record.                              |
| new         |  string   | New value of the modified record.                              |

## _Ideas_

### _Group_

This is a model that represents a group of users and registers, how can this be userful? Supossing the idea that users have created a register and want other users to see the credentials, this model could be used to add users and registers into a group and allow multiple users to access the same information.

#### Fields

| Field      |   Type    | Description                                |
| :--------- | :-------: | :----------------------------------------- |
| id         |  integer  | Unique identifier for the record.          |
| created_at | timestamp | Date and time the record was created.      |
| updated_at | timestamp | Date and time the record was last updated. |
| name       |  string   | Name of the group.                         |

#### Relationships

Each relationship will have its own pivot table to handle the many-to-many relationsip (or, could be a polymorphic relationship with just one table)

- `users`: A collection of users in the group.
- `registers`: A collection of registers in the group.
