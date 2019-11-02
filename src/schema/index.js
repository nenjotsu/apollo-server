import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';
import paymentSchema from './payment';
import unitSchema from './unit';

const linkSchema = gql`
  scalar DateTime

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, unitSchema, paymentSchema, messageSchema];
