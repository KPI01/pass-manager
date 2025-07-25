# Modelos

## Usuario

Modelo que representa un usuario que puede autenticarse en la aplicación.

### Campos

| Campo          | Tipo      | Descripción                                 |
| -------------- | --------- | ------------------------------------------- |
| id             | integer   | Identificador único del registro.           |
| created_at     | timestamp | Fecha y hora de creación del registro.      |
| updated_at     | timestamp | Fecha y hora de actualización del registro. |
| name           | string    | Nombre del usuario.                         |
| email          | string    | Correo electrónico del usuario.             |
| password       | string    | Contraseña encriptada.                      |
| remember_token | string    | Token de recuerdo para el inicio de sesión. |

## Registro

Recurso que representa un registro almacenado dentro de la aplicación, este puede ser un usuario o cuenta de correo electrónico.

### Campos

| Campo       | Tipo      | Descripción                             |
| ----------- | --------- | --------------------------------------- |
| id          | integer   | Identificador único del registro.       |
| created_at  | timestamp | Fecha y hora de creación del registro.  |
| updated_at  | timestamp | Fecha y hora de actualización           |
| description | string    | Descripción del registro.               |
| type        | enum      | Tipo de registro.                       |
| login       | string    | Nombre de usuario o correo electrónico. |
| password    | string    | Contraseña actual encriptada.           |
| notes       | text      | Notas adicionales sobre el registro.    |
