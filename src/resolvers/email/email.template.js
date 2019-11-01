import { CLIENT_ORIGIN } from './email.config';

export default {
  confirm: id => ({
    subject: `${process.env.APP_NAME} - Confirm Email`,
    html: `
      <h1>Welcome to ${process.env.APP_NAME}</h1>
      <p>Thanks for signing up. To access the ${process.env.APP_NAME} system, please verify your email addressby clicking the button below.
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
};
