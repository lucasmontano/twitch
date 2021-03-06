# Overview
This's the [Top Visitors Twitch Extension](https://github.com/lucasmontano/twitch-extension)'s EBS, an Extension that list the TOP 10 visitors in a Twitch Channel.

## Motivation
It's started during a streaming at [Lucas Montano Twitch Channel](https://www.twitch.tv/lucas_montano). The "Chat" has challenged Lucas Montano to work with a Stack he never worked with. The challange thread is called #umaStackQueNaoDomino

## What's an EBS
The EBS is our optional backend service that supports the extension. To know more about EBS, please check the oficial Twitch documentation [here](https://dev.twitch.tv/docs/extensions/building/#creating-your-extension-backend-service-ebs).

## Sumary

- [How to Setup](#how-to-setup)
- [Contributions](#contributions)
- [Testing](#testing)
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

**With Docker**

Run the following scripts to expose shell functions and start up docker containers on *UNIX based OS*

```
source dev.sh
```

Create `.env` file and install npm packages

```
setup_dev_environment
```

Up containers

```
dkup
```

Run commands inside container

```
dk echo Lucas Montano do canal Lucas Montano
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

## Contributions

Hey to contribute on this project, you will have some guidelines to follow.

### Commits

We have a standard for the commits messages, wich is this standard

```
type(scope?): subject  #scope is optional
```

**Type**

Type indicates what you do on your changes, and can be:

- build
- ci
- chore
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

you can see more about it [here](https://www.conventionalcommits.org/en/v1.0.0/)

**Scope**

Scope indicates what is your changes, for an example, lets use the commit of this changes on readme.

```
docs: added contributions guidelines
```

## Testing

**Running all tests**

Depending of which package manager you're using for development, you can run with npm

```
npm run test
```

or with yarn

```
yarn test
```

## Environment Variables

**Node Environment**

- `NODE_ENV`: Setup your node environment, like `production`, `development` or `test`

**Application Options**

- `PORT`: Set the port of the application

## Scripts

- `dev`: Run the application in **development** mode
- `build`: Compile the Typescript using the **tsc**
- `start`: Start the previous compiled aplicattion by the **build** script
- `test`: Run all tests
- `lint`: Run ESLint

## Code Linters

This project use two different code linters and a another
extension to the IDE, that is...

### Eslint

Or EcmaScriptLint, is the linter responsible to check problems in the syntax and return errors, your configurations are shared and used by others linters

### Prettier

This linter is used only for check the **code style**, they don't will check the syntax, just find a way to do the code more **legible** and have a integration with **eslint**

### Editor Config

That isn't a linter, just a extension to share some configs between other editors, like the format of the end of lines, identation with spaces or tabs, etc...
