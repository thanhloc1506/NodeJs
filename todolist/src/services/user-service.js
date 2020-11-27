const User = require("../models/User");

const createUser = (username, password) => {
  return User.create({ username, password });
};

const findById = (id) => {
  return User.findById(id);
};

const findUserByUsername = (username) => {
  return User.findOne({ username: username }).exec();
};

module.exports = { createUser, findUserByUsername, findById };
