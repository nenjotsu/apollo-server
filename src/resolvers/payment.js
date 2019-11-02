import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError } from 'apollo-server';
import { isAdmin, isAuthenticated } from './authorization';
import sendEmail from './email/email.sender';
import emailTemplates from './email/email.template';

export default {
  Query: {
    allPayments: async (parent, args, { models }) => {
      const result = await models.Payment.find();
      return result;
    },
    payment: async (parent, { id }, { models }) => {
      return await models.Payment.findById(id);
    },
    myPayments: combineResolvers(isAuthenticated, async (parent, args, { models, me }) => {
      if (!me) {
        return [];
      }
      console.log('me', me);
      const user = await models.User.findById(me.id);
      const result = await models.Payment.find({ unitNo: user.unitNo });
      return result;
    }),
  },

  Mutation: {
    createPayment: async (
      parent,
      {
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
      return payment.id;
    },

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

    // deletePayment: combineResolvers(isAdmin, async (parent, { id }, { models }) => {
    //   const payment = await models.Payment.findById(id);

    //   if (payment) {
    //     await payment.remove();
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }),
  },
};
