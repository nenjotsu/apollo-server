import { CLIENT_ORIGIN } from './email.config';

export default {
  confirm: id => ({
    subject: `${process.env.APP_NAME} - Confirm Email`,
    html: `
      <h1>Welcome to ${process.env.APP_NAME}</h1>
      <p>Thanks for signing up. To access the ${process.env.APP_NAME} system, please verify your email address by clicking the button below.
      <hr />
      <a href='${CLIENT_ORIGIN}/email_confirm/${id}' style='
          padding: 0.3em .5em;
          border-radius: 5px;
          background: #4caf50;
          font-size: 1.3em;
          font-family: sans-serif;
          color: #fff;
          text-transform: uppercase;
          text-decoration: none;
      '>
        Click to confirm email
      </a>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`,
  }),
  paymentCopy: ({
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
  }) => ({
    subject: `${unitNo} Association Due Payment - ${process.env.APP_NAME}`,
    html: `
    <h1>Association Due Payment - ${process.env.APP_NAME}</h1>
    <p>Thanks for paying the association due. This will served as copy of your receipt of association due payment as of ${datePayment}</p>
    <hr />
      <p><strong>OR No.<strong>: ${orNo}</p>
      <p><strong>Unit No.<strong>: ${unitNo}</p>
      <p><strong>Amount<strong>: ${amount}</p>
      <p><strong>Remarks<strong>: ${remarks}</p>
      <p><strong>Payment Type<strong>: ${paymentType}</p>
      <p><strong>Date Payment<strong>: ${datePayment}</p>
      ${
        paymentType === 'check'
          ? `
        <p><strong>Date of Check<strong>: ${dateOfCheck}</p>
        <p><strong>Date Posted<strong>: ${datePosted}</p>
        <p><strong>Check Status<strong>: ${checkStatus}</p>
        <p><strong>Check No.<strong>: ${checkNo}</p>
        <p><strong>Bank Name<strong>: ${bankName}</p>
        <p><strong>Bank Branch<strong>: ${bankBranch}</p>
      `
          : ''
      }
    `,
    text: `Thanks for paying the association due.`,
  }),
};
