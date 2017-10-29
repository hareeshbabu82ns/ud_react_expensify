# Expensify - Udemy React Practice
## Boilerplate
# Setup Step-by-Step
- yarn init -y
- yarn add babel-preset-react babel-preset-env
- yarn add babel-core babel-loader
- yarn add react react-dom react-router-dom
- yarn add webpack webpack-dev-server
- yarn add -D babel-preset-stage-2

- yarn add react-modal
- css-loader style-loader
- sass-loader node-sass
- normalize.css
- yarn redux react-redux
- uuid - to generate unique ID
- yarn add -D babel-plugin-transform-object-rest-spread for Object Spread support
- moment react-dates react-addons-shallow-compare
- extract-text-webpack-plugin - to extract CSS/SCC text and place in it own file (useful to have seperate files for JS and CSS)

- yarn add firebase
- redux-thunk - to allow redux to work with async functions

## webpcak build
yarn build
## webpack dev server
yarn serve
 
## Heroku setup
* download & install Heroku CLI
* $> heroku --version
* $> heroku login
* $> heroku create <app-name>
  * which will add new "git remote" named heroku
  * check the same with $> git remote -v
* in package.json
  * add "start" script
  * add "heroku-postbuild" to run build commands
* with the express server user process.env.PORT to start
* finally push changes first to GitHub and to Heroku with "git push heroku master"
* check the logs with "$> heroku logs"

## Dev/Prod environment
* setting up Dev and Prod environment variables
* to avoid Firebase Auth Keys to be exposed to Browser or commiting to GitHub
* move firebase keys to file .env.development
  * ```FIREBASE_API_KEY=<___>```
  * ```FIREBASE_AUTH_DOMAIN=<___>```
  * ```FIREBASE_DATABASE_URL=<___>```
  * ```FIREBASE_PROJECT_ID=<___>```
  * ```FIREBASE_STORAGE_BUCKET=<___>```
  * ```FIREBASE_MESSAGING_SENDER_ID=<___>```
* pass these to webpack.DefinePlugin in webpack.config.js to set as environment variables
* for production (heroku), set the environment variables as follows (from Heroku CLI)
  * ```heroku config``` - will get all set variables  
  * ```heroku config:set KEY=VALUE```
  * ```heroku config:unset KEY```
  * Note - for multiples use space as seperator

## Firebase DB Auth Rules
The following will check with ```.validate```
* user is authenticated to expenses ```auth.id```
* each expense object has specified children ```newData.hasChildren(['__','__'])```
* each value individually as String or Number
  * ```newData.isNumber()```
  * ```newData.isString()```
  * ```newData.val().lenght > 0```
* No extra nodes or values are allowed ```$other - false```
```JSON
{
  "rules": {
    ".read":false,
    ".write":false,    
    "<other_db>": {
      ".read": true,
      ".write":true
    },
    "udemy-expensify": {
      ".read": false,
      ".write":false,
      "users":{
        "$user_id":{
          ".read":"$user_id === auth.uid",
          ".write":"$user_id === auth.uid",
          "expenses":{
            "$expense_id":{
							".validate":"newData.hasChildren(['description','amount','note','createdAt'])",
              "description": {
                ".validate":"newData.isString() && newData.val().length > 0"
              },
              "note":{
                ".validate":"newData.isString()"
              },
              "amount":{
                ".validate":"newData.isNumber()"
              },
              "createdAt":{
                ".validate":"newData.isNumber()"
              },
              "$other":{
                ".validate":false
              }
            }
          },
          "$other":{
            ".validate":false
          }
        }
      }
    }
  }
}
```