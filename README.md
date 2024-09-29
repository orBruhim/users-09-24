# Users0924

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Features
Client-Side (Angular)
## Add New User:

Add/Remove Address: You can dynamically add or remove addresses for a user.
At Least One Address Required: A user must have at least one address before saving.
Reactive Forms: The form is built using Angular's reactive forms, ensuring strong form control and validation.
Address as a Component: The address form is a standalone component.
Required Fields:
User Name
Address Name
Street
Save Button: The save button is disabled until all the form fields are valid.
City Dropdowns: When a new city is added, all relevant dropdowns in the form are updated accordingly.
Display List of Added Users:

## The list displays the following columns:
User ID
Name (in title case)
Birthdate (formatted)
Addresses Count
A navigation button is available to open the "Add New User" form.
Server-Side (Node.js API)
The client communicates with a Node.js-based server API that manages user data.

## Repository: NaorT/Sealights-task
## API Documentation: You can find the API documentation for managing users in the Swagger UI by running the server and navigating to http://localhost:3000/api-docs.
