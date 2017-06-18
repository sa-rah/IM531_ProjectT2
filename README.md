# IM531_Project T2 - gamefam

## Idea

gamefam is an app that can be used to connect with other gamers and share lists of games with them
that you want to buy/play together. It should be used like the **Steam Family Sharing** but independent from the platform/applications where you buy your games.

## Teammembers
* Sarah Sauseng

## Setup & Folder Structure

The project is set up using **ReactJS**, **Electron** and **Express.js**.
For storing applications states, **Redux**  is used.

**Webpack** is used as build setup. 

For evaluating the Javascript code *ESLint* is used with the recommended setup for ReactJS.

The Node version used is 7.2.0 like stated in the `package.json` file.

The basic folder structure is used as in the lectures. All route components life in the `src/routes` folder. The react components are stored in the folder `components`. Styles are in the `styles.css`, `theme.js` and on top of every component file.

There is one file `Home.jsx` used as entry point for the application (beyond the `main.jsx`). It is to differentiate between the authentication- and the app-part. 

For the login/registration part files there exists the folder `src/auth`. In this folder you find the react components for the registration- & login-form, the route file and the actions file.
The registration/login part uses only a basic error handling & data encryption and is no publishable part. It is just used for this project as demonstration.

The service-worker part is in the files `swRegister.js` & `service-worker.js`. It is still a basic implementation and should be there to store parts of the application. I wanted to use it for sending push-notifications to other users, but the time was over to fast.

There are two stores defined in the application: One for the authentication part and one general. The authentication store file can be found at `src/reducers/userReducers.js`. The general store file can be found at `src/reducers/reducers.js`.
The backend part can be found in the server file `index.js` in folder `server`. 

The application is not fully available offline, because all the data gets loaded from the db on every request. 
Also the login does not work if you are offline.

## Workflow

The workflow needs electron and one server to run. Both can be started simultaneously by running `npm start`.
The project then gets automatically opened in an electron window or you can open `http://localhost:3005/` in the Browser.

## Database

The data is stored using **MongoDB**. The database lives in the cloud at [cloud.mongodb.com](https://cloud.mongodb.com).

## To be continued...

There are plenty things I still want to do in this project. 

For the authentication part there should be a better form handling, error handling and data encryption.

For the lists part there is still a bug that loads added user not correctly when editing a list and the mail of the user logged in can be chosen.

For the games part the idea is to add a autocomplete button for suggesting several games to the user.

And of course the push-notifications that inform all users about changes in their lists.

