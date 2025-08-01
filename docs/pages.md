# Pages

## Registers

The url for this pages is `/registers` and it also accepts a query parameter `entity` to allow the user to filter by entity type. The navigation bar by default have to links that each one uses an specific entity type, to see all the records you will have to acces via the breadcrumbs.

- `/registers?entity=user`: filter just the type of users in the Register model.
- `/registers?entity=email`: filter just the type of emails in the Register model.

Internally is the same page, just that the query parameter is used to filter. On each page you will be able to see the registers that you own and be able to handle them.

## Users

There are two types of page that can be accessed for this resource, one is the list of users registered to access the app and the other is the profile page for the user that is currently logged in. The navigation bar shows an element that points to the list of users registered, and there you will be able to create, modify and delete users. At the bottom of the navigation bar will be a button that shows a dropdown menu with the option *Profile* that will redirect you to the profile page for the user and handle its own information.

