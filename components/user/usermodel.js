const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
}, {
  timestamps: {
    createdAt: 'date_joined',
  },
});

userSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
    if (err) return next(err);

    // hash password along with new salt
    return bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);

      // rewrite password with hash
      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.verifyPassword = (userPassword, cb) => {
  bcrypt.compare(userPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
