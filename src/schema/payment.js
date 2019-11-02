import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    allPayments: [Payment!]
    payment(id: ID!): Payment
    myPayments: [Payment]
  }

  extend type Mutation {
    createPayment(
      orNo: String!
      unitNo: String!
      amount: Int!
      remarks: String!
      paymentType: String!
      datePayment: DateTime!
      dateOfCheck: DateTime
      datePosted: DateTime
      checkStatus: String
      checkNo: Int
      bankName: String
      bankBranch: String
    ): String

    updatePayment(
      id: ID!
      orNo: String!
      unitNo: String!
      amount: Int!
      remarks: String!
      paymentType: String!
      datePayment: DateTime!
      dateOfCheck: DateTime
      datePosted: DateTime
      checkStatus: String
      checkNo: Int
      bankName: String
      bankBranch: String
    ): String

    deletePayment(id: ID!): Boolean!
  }

  type Payment {
    id: ID!
    orNo: String!
    unitNo: String!
    amount: Int!
    remarks: String!
    paymentType: String!
    datePayment: DateTime!
    dateOfCheck: DateTime
    datePosted: DateTime
    checkStatus: String
    checkNo: Int
    bankName: String
    bankBranch: String
    isConfirmed: Boolean
  }
`;
