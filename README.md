# apollo-server

## Features of Server

- Node.js with Express and Apollo Server
  - cursor-based Pagination
- MongoDB Database with Mongoose
  - entities: users, messages
- Authentication
  - powered by JWT and local storage
  - Sign Up, Sign In, Sign Out
  - Email Confirmation upon SignUp
- Authorization
  - protected endpoint (e.g. verify valid session)
  - protected resolvers (e.g. e.g. session-based, role-based)
  - protected routes (e.g. session-based, role-based)
- Performance optimizations
  - example of using Facebook's dataloader
- E2E testing

## Installation

- `git clone`
- `cd apollo-server`
- `touch .env`
- fill out _.env file_ (see below)
- `npm install`
- `npm start`
- [start MongoDB](https://www.robinwieruch.de/mongodb-express-setup-tutorial/)
- visit `http://localhost:8000` for GraphQL playground

#### .env file

```
SECRET=VH^kgG27p@6MaZPFB@6!&zwTMtex6XFH
DATABASE_URL=mongodb://localhost:27017/mydatabase
```

The `SECRET` is just a random string for your authentication. Keep all these information secure by adding the _.env_ file to your _.gitignore_ file. No third-party should have access to this information.

#### Testing

- adjust `test:run-server` npm script with `TEST_DATABASE_URL` environment variable in package.json to match your testing database name
- one terminal: npm run test:run-server
- second terminal: npm run test:execute-test

Inspired by:

- [the-road-to-graphql/fullstack-apollo-express-mongodb-boilerplate](https://github.com/the-road-to-graphql/fullstack-apollo-express-mongodb-boilerplate)
