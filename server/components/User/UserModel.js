const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const { Schema } = mongoose;

const userSchema = new Schema({
  password: String,
  displayName: String,
  email: { type: String, required: true },
  date_joined: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.getSalt(SALT_ROUNDS, (err, salt) => {
    if (err) return next(err);

    // hash password along with new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // rewrite password with hash
      user.password = hash;
      next();
    });
  });
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
