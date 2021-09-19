const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.encrypt = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds).then((hash) => {
      resolve(hash);
    });
  });
};

exports.comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash).then((result) => {
      resolve(result);
    });
  });
};
