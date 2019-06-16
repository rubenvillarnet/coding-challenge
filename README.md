# Coding challenge

This project is a simple MERN aplication composed by two projects:

- **back**: a Express server which serves a simple CRUD API.
- **front**: a React app consuming the API.

## The backend

The backend is an application bootstrapped from [Express Generator](<https://expressjs.com/en/starter/generator.html>) which connects to a **MongoDB** database and performs CRUD operations. 

- You can check the API documentation in [/api](#).
- You can also check the database connection status in [/health](/health).

### Technologies used

- **Express**: NodeJS web framework.
- **Mongoose**: ODM for MongoDB.
- **Swagger UI**: API's documentation.

## The frontend

The front is bootstrapped from [Create React App](<https://facebook.github.io/create-react-app/>). It is a simple SPA that lists all the users and allow the following actions:

- Create.
- Edit.
- Delete.

### Technologies used

- **React**: JS frontend library.
- **Redux**: for state management.
- **Material UI**: React's components library that follows Google's Material Design Guidelines.
- **Moment**: JS library for date manipulation.
- **Axios**: promised based http client.

## Installation

After you downloaded the files, you need to perform the following actions:

####  Run the back

You must have [Nodemon](<https://www.npmjs.com/package/nodemon>) installed globally in order to run the back in dev mode.

In the *back*  folder:

- Run `npm install`in order to install al required packages.

- Create a *.env* file with the following values:

  **HOST**=*server_hostname*

  **PORT**=*server_port*

  **DB**=*database_connection_string*

  **DBHOST**=*database_host*

  **DBPORT**=*database_port*

- Run `npm run dev`

#### Run the front

In the *front* folder:

* Run `npm install`
* Create a *.env.development* file with the value `REACT_APP_API=local_back_hostname`
* Create a *.env.production* file with the value `REACT_APP_API=remote_back_hostname`
* Run `npm start`

## Give it a try!

You can see the project in action here: [https://fullstack-coding-challenge.herokuapp.com/](https://fullstack-coding-challenge.herokuapp.com/).