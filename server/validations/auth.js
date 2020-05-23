const { check, query, validationResult } = require('express-validator')

export const validationResults = (req, res, next) => {
  try {
    validationResult(req).throw()
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase()
    }
    return next()
  } catch (err) {
    res.status(422).json({
      errors: err.mapped()
    })
  }
}

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
