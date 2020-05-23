import passport from 'passport';
import passportJWT from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import UserModel from '../models/user';

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const generateToken = user => {
  // Gets expiration time 720 minutes
  const expiration = Math.floor(Date.now() / 1000) + 60 * 720;
  // returns signed and encrypted token
  return auth.encrypt(
    jwt.sign({
      data: user,
      exp: expiration
    },process.env.JWT_SECRET)
  )
}

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, cb) {
    return UserModel.findOne({ email })
      .then(user => {
        if (!user) {
          return cb(null, false, { message: 'User not found.' });
        }
        user.comparePassword(password, (err, isMatch) => {
          if(isMatch) { 
            return cb(null, user, {
              message: 'Logged In Successfully'
            });
          }
          return cb(null, false, { message: 'Incorrect password.' });
        });
      })
      .catch(err => {
        return cb(err);
      });
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_SECRET
},
  function (jwtPayload, cb) {
    return UserModel.findOne({_id:jwtPayload.id})
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));