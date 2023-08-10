Marvel Api project

![MARVEL](public/1920px-MarvelLogo.svg.png)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

MARVEL API DEFINITION 

https://developer.marvel.com/docs#!/public/

## Bit.dev tracking 

https://bit.dev/josete4ever/marvelous-components


## Typescript migration guide

https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets


## Theme 

https://github.com/creativetimofficial/black-dashboard-react#quick-start


## .env file

it is mandatory to prefix the variables with REACT_APP in order to the create react app cli to understand it.

## proxy option in package.json 

This is a cool feature to get rid of the CORS problems. If several APIS are needed, you can install the http-middleware package "http-proxy-middleware"
and add a setupProxy.js file in the src project folder.

## another cool api 

https://superheroapi.com/
 
## Available Scripts

In the project directory, you can run:


//TODO LIST 

* change all the components to typescript
* change all the css classes to BEM
* continue with stories view
  
// THINGS LEARNED 

  Line 6:15:  Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

useEffect(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state


## DEPLOYED IN NETLIFY

https://app.netlify.com/
https://jose-parreno-loves-marvelheroes.netlify.app/

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## npm run json-server

This script task runs a server on the port 3004 serving an API for development.

## API secrets 

it is stored on the .env file.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


Interesting links 

https://www.pinterest.es/pin/953285446100141809/

               