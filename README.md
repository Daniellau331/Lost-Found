Google Passport Example
========================

This app is a building block for using Google OAuth using [passport-google-oauth20](https://github.com/jaredhanson/passport-google-oauth2).

## Getting set up
You will need to [create an app](https://console.developers.google.com/apis/dashboard) and enable the Google Plus API. 
- Then get the client ID and secret, and set them in the `.env` file. To do this, go to `Create Credentials` > `OAuth client ID`. You will then need to setup the OAuth content screen but all you have to do is set a product name, all other fields are optional. Click save and set the Application type to ‘Web application’. Then you need to provide the ‘Authorized redirect URIs’. This is your Glitch project URL, with '/login/google/return' appended to the end. Your Glitch project URL has the format `https://project-name.glitch.me`. Once done, click Create. Then copy and paste the generated client ID and secret into the `.env` file in your Glitch project.

## View the Code
On the back-end,
- the app starts at `server.js`
- frameworks and packages are in `package.json`
- app secrets are safely stored in `.env`

On the front-end,
- edit `index.html` and `success.html`
- drag in `assets`, like images or music, to add them to your project

Made by Fog Creek
-----------------

\ ゜o゜)ノ
