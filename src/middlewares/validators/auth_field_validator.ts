import { body } from 'express-validator';

const authValidationFor = (route: string) => {
  switch (route) {
    case 'signup':
      return [
        body('username', 'fullname must be string & mandatory')
          .isString()
          .notEmpty(),
        body('email', 'email must be valid & mandatory').isEmail().notEmpty(),
        body('age', 'age must be numeric & mandatory').isNumeric().notEmpty(),
        body('password', 'password cannot be blank').notEmpty(),
        body('password', 'password is too short, at least 6 chars').isLength({
          min: 6,
        }),
        body(
          'password',
          'password must contain digit, lower case and upper case letter'
        ).custom((value: string) => {
          const passwordRgxp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
          return passwordRgxp.test(value);
        }),
      ];

    case 'login':
      return [
        body('username', 'fullname cannot be blank').isString().notEmpty(),
        body('password', 'password cannot be blank').isString().notEmpty(),
      ];

    case 'slot_machine':
      return [
        body('bet', 'bet cannot be blank & must be numeric')
          .isNumeric()
          .notEmpty(),
      ];

    default:
      return [];
  }
};

export default authValidationFor;
