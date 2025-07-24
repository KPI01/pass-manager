# Gestor de Claves

Esta aplicación permite gestionar las claves, tanto de usuarios como de cuentas de correo, de forma segura. También se mostrará el historial de contraseñas del registro respectivo y la antigüedad de la clave.

En un futuro, se buscará almacenar los Two Factor Authenticator y relacionarlos con los respectivos registros, al igual que un generador de contraseñas con patrones personalizados.

## Instalación

1. Instalar las dependencias de la aplicación: `composer install`, y luego, `pnpm install`
2. Crear archivo `.env` copiando y pegando el `.env.example` en el directorio raíz de la aplicación
3. Generar key de Laravel: `php artisan key:generate`
4. Crear la base de datos: `php artisan migrate`
5. Crear un usuario administrador
    - Puede ser con el seeder: `php artisan db:seed`
    - O con el comando: `php artisan tinker` y colocar las credenciales deseadas
6. Ejecuar el proyecto: `php artisan serve`, y en otra terminal, `pnpm run dev`

## Documentación externa

- [Shadcn/ui](https://ui.shadcn.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Inertia.js](https://inertiajs.com)
- [Laravel](https://laravel.com/docs)
- [TanStack React Table](https://tanstack.com/table/v8)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/icons)
