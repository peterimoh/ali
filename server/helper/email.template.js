const config = require('../config/config');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.pass,
  },
});

const activateUserTemp = (usr, token) => {
  const link = `${config.client_url}/activateaccount?${token}`;
  const from = config.email;
  const to = usr.email;
  const subject = 'Account Activation';
  const html = `
    <p>Dear ${usr.username},</p>
    <p>Thank you for registering for our service</p>
    <p><b>this email will expire in 10 minutes</b></p>
    <h4>Please follow the <a href='${config.client_url}/activateaccount?${token}'>Link</a> to activate your account and complete your registration</h4>
    or <a href=${link}>click here to activate</a>
    <p>${link}</p>
    `;
  return { from, to, subject, html };
};

const registerUserTemp = (user) => {
  const from = config.email;
  const to = user.email;
  const subject = 'Account Registration Successful';
  const html = `
    <p>Dear ${user.name}</p>
    <p>Thank you for registering for our Service</p>
    <p>Your username is: ${user.username} </p>
  <p>If you have any questions please contact support</p>
  <p>Best regards,</p>
    `;
  return { from, to, subject, html };
};


const resetPass = (usr, token) => {
  const link = `${config.client_url}/auth/forget-password/${token}`;
  const from = config.email;
  const to = usr.email;
  const subject = 'Password Reset';
  const html = `
    <p>Dear ${usr.username},</p>
    <p>You have requested to reset your password</p>
    <p><b>this email will expire in 10 minutes</b></p>
    <h4>Please follow the <a href='${config.client_url}/resetpassword?${token}'>Link</a> to reset your password</h4>
    or <a href=${link}>click here to reset</a>
    <p>${link}</p>
    `;
  return { from, to, subject, html };
};

const invoiceTemp = (usr, response) => {
  const from = config.email;
  const to = usr && usr.email;
  const subject = `${response.plan} Plan purchase success`;

  const html = `
    <p>Hello ${usr.first_name}</p>
  <p>You have successfully purchased a ${response.plan} plan which will run from ${response.depositDate} to ${response.dueDate}. Your Plan is now <span style='color: green'>${response.status}</span></p>
  <p>Best regards,</p>
    `;
   return { from, to, subject, html };
};

module.exports = {
  transporter,
  activateUserTemp,
  registerUserTemp,
  resetPass,
  invoiceTemp,
};
