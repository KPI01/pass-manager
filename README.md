# Password Manager

This application allows you to securely manage passwords for both users and email accounts. It also displays the password history for the respective record and the password age.

In the future, we will be looking to store Two Factor Authenticators and link them to the respective records, as well as a password generator with custom patterns.

## Installation

1. Install the application dependencies: `composer install`, then `pnpm install`
2. Create a `.env` file by copying and pasting `.env.example` into the application root directory
3. Generate Laravel key: `php artisan key:generate`
4. Create the database: `php artisan migrate`
5. Create an administrator user

- This can be done with the seeder: `php artisan db:seed`
- Or with the command: `php artisan tinker` and enter the desired credentials

6. Run the project: `php artisan serve`, and in another terminal, `pnpm run dev`

## Documentation

- [Here](./docs/models.md) you can find a file that explains the compositions of the models

### External Libraries

- [Shadcn/ui](https://ui.shadcn.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Inertia.js](https://inertiajs.com)
- [Laravel](https://laravel.com/docs)
- [TanStack React Table](https://tanstack.com/table/v8)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/icons)
