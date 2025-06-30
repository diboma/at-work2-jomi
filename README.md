# Jomi VZW 

Project by Dirk Bouckaert for the course @Work 2  
Graduaat Programmeren Arteveldehogeschool 2023-24  

## Scope

Jomi VZW is a 'maatwerkbedrijf' within the green, environment and landscape care sector. They help vulnerable groups to perform a positive and sustainable job. They need an internal personnel tool with which they can monitor their tailor-made employees and ensure smooth internal communication.

## Installation

Make sure Node, npm and Git are installed.
Download or clone the Git repository.

Copy `env.example` and rename it to `.env`.
- Enter a random key for `TOKEN_SALT` and `SESSION_SECRET`.
- The app simulates sending emails via [Mailtrap](https://mailtrap.io). Complete the necessary setting:
  ```
  MAILTRAP_HOST=
  MAILTRAP_PORT=
  MAILTRAP_USER=
  MAILTRAP_PASS=
  ```
Launch the app as follows:

```js
npm install
npx knex migrate:latest
npx knex seed:run
npm start
// App is listening at http://localhost:3000 
```

You can customize Bootstrap in `scss/bootstrap.scss`.  
For development you can run the app in 'watch' mode:

```
npm run start:dev
```

The app was developed for two roles:

- coach ('maatwerkcoach')
  - username: tim@example.com
  - password: artevelde
- employee ('maatwerker')
  - username: maatwerker@example.com
  - password: artevelde

## Feature Overview

### Authentication
  - login
  - validation (valid email, password length)
  - profile page (change name, avatar, email, ...)

### Authorization
  - An employee (**maatwerker**) can only view his/her evaluations, observations, ...
  - A coach (**maatwerkcoach**) can see all evaluations, observations, ... He/she can also edit and add items.

## Technologies 
- MVC architecture using NodeJS and Express
- ES6 modules
- HTML, CSS (Bootstrap) and Javascript
- Htmx: perform api calls (editing and deleting) and update the UI without page reload
- Template engine: Handlebars
- Database: Knex.js and Objection.js with sqlite
- Authentication: 
  - JSON Web Token
  - bcrypt to encrypt and decrypt passwords 
- Form validation: express validator
- Faker (for seeding)
- Nodemailer (for sending emails)
- Sweetalert2 (for alerts)
- Trix (for rich text editing)

