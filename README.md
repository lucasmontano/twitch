# Overview

A simple quickstart in Node with Typescript

## Sumary

- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Code Linters](#code-linters)

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
