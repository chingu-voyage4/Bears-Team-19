const passport = require('passport');

const User = require('../User/UserModel.js');

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
});


passport.use(new LocalStrategy('local',
   ((username, password, password, done) => {
        User.findOne({ username: username})
            .then(user => {
                // User does not exist
                if (!user) {
                    return done(null, false);
                }

                // Password does not match 
                if (!user.verifyPassword) return done(false);

                // Logs in user
                return done(null, user)
            })
            .catch(err => {
                return done(err);
            })
    }
 ));

passport.use('registration', new LocalStrategy(((username, password, done) => {
    User.findOne({ displayName: username}, (err, user) => {
        if (!user) {
            const newUser = new User({
                displayName: username,
                password,
            });

            return newUser.save((error) => {
                return done(null, false);
            });
        }

        return done(null, false);
    })
})));