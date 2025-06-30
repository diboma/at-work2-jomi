import { body } from "express-validator";

export default [
  body("firstname")
    .notEmpty()
    .withMessage("Voornaam is verplicht")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Voornaam mag maximaal 255 tekens bevatten"),
  body("lastname")
    .notEmpty()
    .withMessage("Achternaam is verplicht")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Voornaam mag maximaal 255 tekens bevatten"),
  body("email")
    .notEmpty()
    .withMessage("E-mail is verplicht")
    .bail()
    .isLength({ max: 255 })
    .withMessage("E-mail mag maximaal 255 tekens bevatten")
    .bail()
    .isEmail()
    .withMessage("Vul een geldig e-mail adres in"),
  body("password")
    .notEmpty()
    .withMessage("Wachtwoord is verplicht")
    .bail()
    .isLength({ min: 8 })
    .withMessage('Wachtwoord moet ten minste 8 tekens bevatten.'),
  // .isStrongPassword()
  // .withMessage("Wachtwoord moet minstens 8 tekens lang zijn en minstens 1 letter, 1 cijfer en 1 speciaal karakter bevatten"),
];