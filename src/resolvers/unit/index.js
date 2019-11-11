import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, ApolloError } from 'apollo-server';
import { isAdmin, isAuthenticated } from '../authorization';
import sendEmail from '../email/email.sender';
import emailTemplates from '../email/email.template';

export default {
  Query: {
    allUnits: combineResolvers(isAuthenticated, async (parent, args, { models }) => {
      const result = await models.Unit.find();
      return result;
    }),
    unit: async (parent, { unitNo }, { models }) => {
      return await models.Unit.findOne({ unitNo });
    },
    myUnit: combineResolvers(isAuthenticated, async (parent, args, { models, me }) => {
      if (!me) {
        return;
      }
      const user = await models.User.findById(me.id);
      return await models.Unit.findOne({ unitNo: user.unitNo });
    }),
  },

  Mutation: {
    // signIn: async (parent, { login, password }, { models, secret }) => {
    //   const unit = await models.Unit.findByLogin(login);
    //   if (!unit) {
    //     throw new UnitInputError('No unit found with this login credentials.');
    //   }
    //   const isValid = await unit.validatePassword(password);
    //   if (!isValid) {
    //     throw new AuthenticationError('Invalid username/email or password.');
    //   }
    //   if (!unit.confirmed) {
    //     throw new AuthenticationError('Please confirm the email first before you can sign in.');
    //   }
    //   return {
    //     message: 'Logged in successfully!',
    //   };
    // },
    // updateUnit: combineResolvers(
    //   isAuthenticated,
    //   async (parent, { username }, { models, me }) => {
    //     return await models.Unit.findByIdAndUpdate(me.id, { username }, { new: true });
    //   },
    // ),
    // deleteUnit: combineResolvers(isAdmin, async (parent, { id }, { models }) => {
    //   const unit = await models.Unit.findById(id);
    //   if (unit) {
    //     await unit.remove();
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }),
  },
};
