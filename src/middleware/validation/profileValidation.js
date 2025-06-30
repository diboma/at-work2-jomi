import { body } from 'express-validator';

export default [
  body('firstname')
    .notEmpty()
    .withMessage('Voornaam is verplicht')
    .bail()
    .isLength({ max: 255 })
    .withMessage('Voornaam mag maximaal 255 tekens bevatten'),
  body('lastname')
    .notEmpty()
    .withMessage('Achternaam is verplicht')
    .bail()
    .isLength({ max: 255 })
    .withMessage('Voornaam mag maximaal 255 tekens bevatten'),
  body('email')
    .notEmpty()
    .withMessage('E-mail is verplicht')
    .bail()
    .isLength({ max: 255 })
    .withMessage('E-mail mag maximaal 255 tekens bevatten')
    .bail()
    .isEmail()
    .withMessage('Vul een geldig e-mail adres in'),
  body('RRN')
    .notEmpty()
    .withMessage('Rijksregisternummer is verplicht')
    .bail()
    .isLength({ min: 11, max: 11 })
    .withMessage('Het rijksregisternummer moet exact 11 cijfers bevatten.'),
  body('address')
    .isLength({ max: 255 })
    .withMessage('Adres mag maximaal 255 tekens bevatten'),
  body('phone')
    .isLength({ max: 20 })
    .withMessage('Telefoonnummer mag maximaal 20 tekens bevatten'),
  body('communication_preference')
    .isLength({ max: 255 })
    .withMessage('Communicatievoorkeur mag maximaal 255 tekens bevatten'),
  body('health_insurance_fund')
    .isLength({ max: 255 })
    .withMessage('Mutualiteit mag maximaal 255 tekens bevatten'),
];
