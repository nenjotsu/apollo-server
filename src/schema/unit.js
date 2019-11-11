import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    allUnits: [Unit!]
    unit(unitNo: String!): Unit
    myUnit: Unit
  }

  extend type Mutation {
    updateUnit(
      id: ID!
      unitNo: String!
      ownerName: String
      houseModel: String
      dateTurnedOver: DateTime
      lotArea: Int
      phase: Int
      block: Int
      lot: Int
      isCompleted: Boolean
    ): String
  }

  type Unit {
    id: ID
    unitNo: String
    ownerName: String
    houseModel: String
    dateTurnedOver: DateTime
    lotArea: Int
    phase: Int
    block: Int
    lot: Int
    isCompleted: Boolean
  }
`;
