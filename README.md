# Overview

A simple quickstart in Node with Typescript

## Sumary

- [How to Setup](#how-to-setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Code Linters](#code-linters)

## How to Setup

first clone or download the repository

```
git clone https://github.com/lucasmontano/twitch.git
```

After that you can install the dependencies by executing the following command in the root folder of the project

```
npm install
```

or with yarn

```
yarn
```

Now you have 2 options to start the project:

1. Start the apllication in development mode
2. Generate a production build

**Development Mode**

Run the following script to start the aplicattion on development mode with a watcher for file changes

```
npm run dev
```

or with yarn

```
yarn dev
```

**Production Mode**

First generate a build with the following command

```
npm run build
```

or with yarn

```
yarn build
```

Now to start the compiled aplicattion, run this command

```
npm run start
```

or with yarn

```
yarn start
```

## Environment Variables

**Node Environment**

- `NODE_ENV`: Setup your node environment, like `production`, `development` or `test`

**Application Options**

- `APP_PORT`: Set the port of the application

## Scripts

- `dev`: Run the application in **development** mode
- `build`: Compile the Typescript using the **tsc**
- `start`: Start the previous compiled aplicattion by the **build** script

## Code Linters

This project use two different code linters and a another
extension to the IDE, that is...

### Eslint

Or EcmaScriptLint, is the linter responsible to check problems in the syntax and return errors, your configurations are shared and used by others linters

### Prettier

This linter is used only for check the **code style**, they don't will check the syntax, just find a way to do the code more **legible** and have a integration with **eslint**

### Editor Config

That isn't a linter, just a extension to share some configs between other editors, like the format of the end of lines, identation with spaces or tabs, etc...
