import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    emailConfirm(id: ID!): String!
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      confirmed: Boolean
      role: String!
      contactNo: String!
      unitNo: String!
      residencyType: String!
      firstName: String!
      middleName: String
      lastName: String!
      dateTurnedOver: DateTime
      dateOfBirth: DateTime!
    ): Token!

    signIn(login: String!, password: String!): Token!
    updateUser(username: String!): User!
    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
    message: String
    role: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    confirmed: Boolean
    role: String!
    contactNo: String!
    unitNo: String!
    residencyType: String!
    firstName: String!
    middleName: String
    lastName: String!
    position: String
    occupation: String
    business: String
    businessType: String
    dateTurnedOver: DateTime
    dateOfBirth: DateTime
    messages: [Message!]
  }
`;
