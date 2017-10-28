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
