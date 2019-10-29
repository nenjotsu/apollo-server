import nodemailer from 'nodemailer';

const credentials = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(credentials);

export default async (to, content) => {
  const contacts = {
    from: process.env.MAIL_USER,
    to,
  };

  const email = { ...content, ...contacts };

  await transporter.sendMail(email);
};
