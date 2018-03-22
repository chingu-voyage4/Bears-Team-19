const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../User/UserModel.js');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use('local-login', new LocalStrategy((username, password, done) => {
  User.findOne({ displayName: username })
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

passport.use('local-register', new LocalStrategy(((username, password, done) => {
  User.findOne({ displayName: username })
    .then((user) => {
      if (!user) {
        const newUser = {
          displayName: username,
          password,
        };

        const userSave = new User(newUser);
        userSave.save();
        return done(null, userSave);
      }

      const err = {
        message: 'User exists',
      };
      return done(null, false, err);
    })
    .catch((err) => {
      console.log(err, 'this is err');
      return done(err);
    });
})));
