import { combineResolvers } from 'graphql-resolvers';
import { orderBy } from 'lodash';
import { AuthenticationError } from 'apollo-server';
import { isAdmin, isAuthenticated } from '../authorization';
import sendEmail from '../email/email.sender';
import emailTemplates from '../email/email.template';

export default {
  Query: {
    allPayments: combineResolvers(isAuthenticated, async (parent, args, { models }) => {
      const result = await models.Payment.find();
      return orderBy(result, ['datePayment'], ['desc']);
    }),
    payments: combineResolvers(isAuthenticated, async (parent, { unitNo }, { models }) => {
      const result = await models.Payment.find({ unitNo });
      return orderBy(result, ['datePayment'], ['desc']);
    }),
    myPayments: combineResolvers(isAuthenticated, async (parent, args, { models, me }) => {
      if (!isAuthenticated || !me) {
        return [];
      }
      const result = await models.Payment.find({ unitNo: me.unitNo });
      return orderBy(result, ['datePayment'], ['desc']);
    }),
  },

  Mutation: {
    createPayment: combineResolvers(
      isAuthenticated,
      async (
        parent,
        {
          orNo,
          unitNo,
          amount,
          remarks,
          paymentType,
          datePayment,
          dateOfCheck = moment(''),
          datePosted = moment(''),
          checkStatus,
          checkNo,
          bankName,
          bankBranch,
        },
        { models },
      ) => {
        const payment = await models.Payment.create({
          orNo,
          unitNo,
          amount,
          remarks,
          paymentType,
          datePayment,
          dateOfCheck,
          datePosted,
          checkStatus,
          checkNo,
          bankName,
          bankBranch,
          isConfirmed: false,
        });

        // sendEmail(email, emailTemplates.paymentCopy(payment));
        return `Successfully created Payment ID: ${payment.id}`;
      },
    ),

    deletePayment: combineResolvers(isAuthenticated, async (parent, { id }, { models }) => {
      const payment = await models.Payment.findById(id);

      if (payment) {
        await payment.remove();
        return true;
      } else {
        return false;
      }
    }),

    // signIn: async (parent, { login, password }, { models, secret }) => {
    //   const payment = await models.Payment.findByLogin(login);

    //   if (!payment) {
    //     throw new PaymentInputError('No payment found with this login credentials.');
    //   }

    //   const isValid = await payment.validatePassword(password);

    //   if (!isValid) {
    //     throw new AuthenticationError('Invalid username/email or password.');
    //   }
    //   if (!payment.confirmed) {
    //     throw new AuthenticationError('Please confirm the email first before you can sign in.');
    //   }

    //   return {
    //     message: 'Logged in successfully!',
    //   };
    // },

    // updatePayment: combineResolvers(
    //   isAuthenticated,
    //   async (parent, { username }, { models, me }) => {
    //     return await models.Payment.findByIdAndUpdate(me.id, { username }, { new: true });
    //   },
    // ),
  },
};
