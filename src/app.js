import * as path from 'path';
import bodyParser from 'body-parser';
import { create } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import expressRedirectWithFlash from 'express-redirect-with-flash';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import session from 'express-session';
import { SESSION_SECRET, SOURCE_PATH, TINYMCE_PATH } from './lib/consts.js';

// Import Handlebarhelpers
import handlebarHelpers from './lib/hbsHelpers.js';

// Import routers
import accidentRouter from './routers/accidentRouter.js';
import authRouter from './routers/authRouter.js';
import apiRouter from './routers/apiRouter.js';
import appointmentRouter from './routers/appointmentRouter.js';
import equipmentRouter from './routers/equipmentRouter.js';
import evaluationRouter from './routers/evaluationRouter.js';
import mailRouter from './routers/mailRouter.js';
import observationRouter from './routers/observationRouter.js';
import profileRouter from './routers/profileRouter.js';
import techSheetRouter from './routers/techSheetRouter.js';
import trainingRouter from './routers/trainingRouter.js';

/**
 * INIT DOTENV
 */
dotenv.config();

/**
 * CREATE EXPRESS APP
 */
const port = process.env.PORT || 3000;
const app = express();

// Serve static assets
app.use(express.static('public'));

// Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup cookie parser
app.use(cookieParser());

// Setup method override
app.use(methodOverride('_method'));

// Setup tinymce
app.use('/tinymce', express.static(TINYMCE_PATH));

// Setup flash messages
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(expressRedirectWithFlash);

// Setup Handlebars
const hbs = create({
  helpers: handlebarHelpers,
  extname: 'hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

/**
 * APP ROUTES
 */
app.use('/', authRouter);
app.use('/profiel', profileRouter);
app.use('/evaluatie', evaluationRouter);
app.use('/observatie', observationRouter);
app.use('/opleiding', trainingRouter);
app.use('/arbeidsongevallen', accidentRouter);
app.use('/kledij-en-materiaal', equipmentRouter);
app.use('/afspraken', appointmentRouter);
app.use('/technische-fiches', techSheetRouter);

/**
 * MAIL ROUTES
 */
app.use('/mail', mailRouter);

/**
 * API ROUTES.
 */
app.use('/api', apiRouter);

/**
 * NOT FOUND ROUTES
 */
app.get('*', (req, res) => {
  res.status(404).render('404', { layout: 'auth' });
});

/**
 * SERVE APP
 */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
