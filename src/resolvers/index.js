import { GraphQLDateTime } from 'graphql-iso-date';

import userResolvers from './user';
import unitResolvers from './unit';
import paymentResolvers from './payment';
import messageResolvers from './message';

const customScalarResolver = {
  DateTime: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  unitResolvers,
  paymentResolvers,
  messageResolvers,
];
