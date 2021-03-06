import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import sendEmail from '../email/email.sender';
import msgs from '../email/email.messages';
import emailTemplates from '../email/email.template';
import { isAdmin, isAuthenticated } from '../authorization';
import createToken from './createToken';
import queryUsers from './query.users';

export default {
  Query: {
    users: queryUsers,
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
    me: combineResolvers(isAuthenticated, async (parent, args, { models, me }) => {
      if (!isAuthenticated || !me) {
        return null;
      }
      let ownerInfo;
      const user = await models.User.findById(me.id);
      if (!user.dateTurnedOver) {
        ownerInfo = await models.User.findOne({ unitNo: user.unitNo, role: 'admin' });
      } else {
        return user;
      }
      const final = {
        ...user._doc,
        id: user._doc._id,
        dateTurnedOver: ownerInfo.dateTurnedOver,
      };
      return final;
    }),
    emailConfirm: async (parent, { id }, { models }) => {
      const user = await models.User.findById(id);
      if (!user) {
        return msgs.couldNotFind;
      }

      // The user exists but has not been confirmed. We need to confirm this
      // user and let them know their email address has been confirmed.
      else if (user && !user.confirmed) {
        const userExisting = await models.User.findByIdAndUpdate(id, {
          confirmed: true,
        });

        if (userExisting) {
          return msgs.confirmed;
        }
      }

      // The user has already confirmed this email address.
      else {
        return msgs.alreadyConfirmed;
      }
    },
  },

  Mutation: {
    signUp: async (
      parent,
      {
        username,
        email,
        password,
        role,
        contactNo,
        unitNo,
        residencyType,
        firstName,
        middleName,
        lastName,
        dateTurnedOver,
        dateOfBirth,
      },
      { models, secret },
    ) => {
      const userExisting = await models.User.findOne({ email });
      if (!userExisting) {
        const user = await models.User.create({
          username,
          email,
          password,
          confirmed: false,
          role,
          contactNo,
          unitNo,
          residencyType,
          firstName,
          middleName,
          lastName,
          dateTurnedOver,
          dateOfBirth,
        });

        sendEmail(email, emailTemplates.confirm(user._id));
        return {
          token: '',
          message: msgs.confirm,
        };
      } else if (userExisting && !userExisting.confirmed) {
        sendEmail(userExisting.email, emailTemplates.confirm(userExisting._id));
        return {
          token: '',
          message: msgs.resend,
        };
      } else {
        return {
          token: '',
          message: msgs.alreadyConfirmed,
        };
      }
    },

    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError('No user found with this login credentials.');
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid username/email or password.');
      }
      if (!user.confirmed) {
        throw new AuthenticationError('Please confirm the email first before you can sign in.');
      }

      return {
        token: createToken(user, secret, '1d'),
        message: 'Logged in successfully!',
        role: user.role,
      };
    },

    updateUser: combineResolvers(isAuthenticated, async (parent, { username }, { models, me }) => {
      return await models.User.findByIdAndUpdate(me.id, { username }, { new: true });
    }),

    deleteUser: combineResolvers(isAdmin, async (parent, { id }, { models }) => {
      const user = await models.User.findById(id);

      if (user) {
        await user.remove();
        return true;
      }

      return false;
    }),
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.find({
        userId: user.id,
      });
    },
  },
};
