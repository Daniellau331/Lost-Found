Google Passport Example
========================

This app is a building block for using Google OAuth 2.0 using [passport-google-oauth20](https://github.com/jaredhanson/passport-google-oauth2).

## Getting set up
You will need to create a project on Google, and enable this project to 
do OAuth 2.0 login.  As part of this process you will:

Give Google the URLs of this app, and of an intermediate route which it will use in the login process

Get a client ID and secret , and add them in the `.env` file. 

[create a project] (https://console.developers.google.com/apis/dashboard) 




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
