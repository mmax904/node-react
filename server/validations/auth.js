import { check, query } from 'express-validator';
import { validationResults } from '../utils/validations';

export const login = [
  check('email')
    .exists()
    .withMessage('ERR_MISSING')
    .not()
    .isEmpty()
    .withMessage('ERR_IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('password')
    .exists()
    .withMessage('ERR_MISSING')
    .not()
    .isEmpty()
    .withMessage('ERR_IS_EMPTY')
    .isLength({
      min: 5
    })
    .withMessage('ERR_PASSWORD_TOO_SHORT_MIN_5'),
  (req, res, next) => {
    validationResults(req, res, next)
  }
];

export const cities = [
  query('page')
    .optional()
    .isNumeric()
    .withMessage('Only numbers allowed'),
  query('limit')
    .optional()
    .isNumeric()
    .withMessage('Only numbers allowed'),
  (req, res, next) => {
    validationResults(req, res, next)
  }
];
