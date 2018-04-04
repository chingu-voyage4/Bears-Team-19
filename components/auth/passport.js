const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../user/usermodel.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  User.find({ _id: user._id })
    .select('-password')
    .then((doc) => {
      console.log(doc, 'this is doc on desearlaize');
      done(null, doc);
    });
});

// https://github.com/RisingStack/nodehero-authentication/blob/master/app/authentication/init.js

passport.use('local-login', new LocalStrategy((username, password, done) => {
  User.findOne({ username })
    .then((user) => {
      // User does not exist
      if (!user) {
        return done(null, false, { message: 'Username does not exist' });
      }

      // Password does not match
      user.verifyPassword(password, (err, isMatch) => {
        if (err) return done(null, false, { message: err });
        if (!isMatch) return done(null, false, { message: 'Password does not match' });
        // password matches return
        return done(null, user);
      });
    })
    .catch(err => done(err));
}));
