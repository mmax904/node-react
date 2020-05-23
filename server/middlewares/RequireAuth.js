import passport from 'passport';
const RequireAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user) {
          const err = {};
          err.status = 401;
          err.message = 'Unauthorized, Login To Continue';
          return res.status(401).json(err);
        }
        return next();
    
      })(req, res, next); 
      /** 
       * passport.authentication returns a function,
       * we invoke it with normal req..res arguments to override default functionality
       */ 
}

export default RequireAuth;
