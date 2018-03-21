const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../User/UserModel.js');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy('local-login', (username, password, done) => {
  User.findOne({ displayName: username })
    .then((user) => {
      // User does not exist
      if (!user) {
        return done(null, false);
      }

      // Password does not match
      if (!user.verifyPassword) return done(false);

      // Logs in user
      return done(null, user);
    })
    .catch(err => done(err));
}));

passport.use('local-register', new LocalStrategy(((username, password, done) => {
  console.log(username, password, 'this is username and password');
  
  User.findOne({ displayName: username })
    .then((user) => {
      if (!user) {
        const newUser = {
          displayName: username,
          password,
        };

        const userSave = new User(newUser);
        userSave.save();
        done(null, userSave);
        return true;
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
