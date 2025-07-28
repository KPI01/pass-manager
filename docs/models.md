# Modelos

## User

Modelo que representa un usuario que puede autenticarse en la aplicación.

### Campos

| Campo          | Tipo      | Descripción                                        |
| -------------- | --------- | -------------------------------------------------- |
| id             | integer   | Identificador único del registro.                  |
| created_at     | timestamp | Fecha y hora de creación del registro.             |
| updated_at     | timestamp | Fecha y hora de actualización del registro.        |
| name           | string    | Nombre del usuario.                                |
| email          | string    | Correo electrónico del usuario.                    |
| password       | string    | Contraseña encriptada.                             |
| remember_token | string    | Token de recuerdo para el inicio de sesión.        |
| role_id        | integer   | Identificador del rol al que pertenece el usuario. |

## Role

Modelo que representa el rol que cumple el usuario dentro de la aplicación. Este permitirá autorizar o no las diferentes acciones que intente realizar el usuario.

### Campos

| Campo      | Tipo      | Descripción                            |
| ---------- | --------- | -------------------------------------- |
| id         | integer   | Identificador único.                   |
| created_at | timestamp | Fecha y hora de creación del rol.      |
| updated_at | timestamp | Fecha y hora de actualización del rol. |
| name       | string    | Nombre del rol.                        |
| short      | string    | Nombre corto del rol.                  |

## Register

Recurso que representa un registro almacenado dentro de la aplicación, este puede ser un usuario o cuenta de correo electrónico.

### Campos

| Campo       | Tipo      | Descripción                                 |
| ----------- | --------- | ------------------------------------------- |
| id          | integer   | Identificador único del registro.           |
| created_at  | timestamp | Fecha y hora de creación del registro.      |
| updated_at  | timestamp | Fecha y hora de actualización               |
| description | string    | Descripción del registro.                   |
| type        | enum      | Tipo de registro. ['user','email']          |
| login       | string    | Nombre de usuario o correo electrónico.     |
| password    | string    | Contraseña actual encriptada.               |
| notes       | text      | Notas adicionales sobre el registro.        |
| owner_id    | integer   | Identificador del propietario del registro. |
