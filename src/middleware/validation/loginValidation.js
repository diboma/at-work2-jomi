import { body } from "express-validator";

export default [
  body('email')
    .notEmpty()
    .withMessage('E-mail is verplicht')
    .bail()
    .isLength({ max: 255 })
    .withMessage('E-mail mag maximaal 255 tekens bevatten')
    .bail()
    .isEmail()
    .withMessage('Vul een geldig e-mail adres in'),
  body('password')
    .notEmpty()
    .withMessage('Wachtwoord is verplicht')
    .isLength({ min: 8 })
    .withMessage('Wachtwoord moet ten minste 8 tekens bevatten.'),
];