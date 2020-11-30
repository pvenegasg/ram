# RAM

RAM is an web application written in Javascript that displays a list of characters of the tv series Rick And Morty. The app allows to search for the character name or status.

### Requirements
- Node.js
- Docker (optional)

### Main technologies
- Javascript
- Webpack
- Typescript
- Sass


### Development mode
First you need to install the dependecies. You can check them inside the `package.json` file.
```
npm install
```

#### Option 1
You can use the development environment using docker. To install the dependencies and create the project image run:
```
npm run docker:build
```

Then to start the development mode, execute:
```
npm run docker:dev
```
The previous command will start a development mode using `webpack`. To access the app you need to navigate `http://localhost:8080`

#### Option 2
Just using your local env with npm:
```
npm run dev
```
This will start the server in the address `http://localhost:8080`

### Production
Since your code will not run in the browser, you need to compile your assets. The build process it is executed through Webpack and it will generate the assets in the `dist` folder. To generate a build run:
```
npm run build
```

The result can be server through the http server of your choice.


