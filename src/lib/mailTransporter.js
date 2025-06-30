import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import { VIEWS_PATH } from './consts.js';

import {
  MAILTRAP_HOST,
  MAILTRAP_PASS,
  MAILTRAP_PORT,
  MAILTRAP_USER,
} from './consts.js';

const transporter = nodemailer.createTransport({
  host: MAILTRAP_HOST,
  port: MAILTRAP_PORT,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
});

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.hbs',
      partialsDir: path.join(VIEWS_PATH, 'partials'),
      layoutsDir: path.join(VIEWS_PATH, 'layouts'),
      defaultLayout: 'mail.hbs',
    },
    viewPath: path.join(VIEWS_PATH, 'emails'),
    extName: '.hbs',
  })
);

export default transporter;
