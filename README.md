# === Custom react-typescript project ===

## Description

This assembly contains **modules** such as:
- **typescript** - "The minimum set of types for working with a react"
- **react-router-dom @types/react-router-dom**
- **react-redux @types/react-redux**
- **redux-thunk** - "By default includes types"
- **react-app-rewired** - "Allow you use aliases in react(setup description below)"
- **node-sass** - "Preprocessor css"
- **eslint** - "An AST-based pattern checker for JavaScript"
- **prettier** - "format code"
- **husky** - "precommit cheker"
- **lint-staged** - "Pre-commit code formatting tool"

#### Aliases

If you want add alises, you must to edit two files("config-overrides.js", tsconfig.paths.json).
You must specify the same directory for the alias, but the path pattern is slightly different for example: 
("@components/*": ["./src/Components/*"] and '@components': resolve(__dirname, 'src/Components')) - be careful!

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhosfet:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

### `npm run lint`

Allows you to run a file check and identify errors in your project. (used eslint with prettier)

### `npm run format`

Allows you to format files in your project. (used prettier)

## `Before commit...`

Run "husky" and "lint-staged" (settings in package.json), but without check test(jest);

## Cuted settings from "package-json" (NOT SUPPORT ALIASES IN TYPESCRIPT)

```javascript
"hooks": {
        "pre-commit": "lint-staged"
    },
    "lint-staged": {
        "src/**/*.{js,ts,jsx,tsx}": [
            "eslint --fix"
        ],
        "*.{json,css,scss}": [
            "prettier --write"
        ],
        "*.{js,jsx,ts,tsx}": "eslint --cache --fix"
},
```