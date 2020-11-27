const { Router } = require("express");
const userService = require("../services/user-service");
const jwt = require("jsonwebtoken");
const router = Router({ mergeParams: true });
const { requireUser } = require("../middleware/auth");
const JWT_SECRET = require("../config");

const requireUsers = (req, res, next) => {
  if (req.headers.user) {
    next();
  } else {
    console.log("Require user!");
    res.status(403).json({ message: "User is required" });
  }
};

router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username) {
  }
  if (!password) {
  }

  userService
    .findUserByUsername(username)
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Username is existing" });
        return;
      }
      return Promise.resolve(true);
    })
    .then(() => {
      return userService.createUser(username, password).then((createdUser) => {
        res.status(201).json(createdUser);
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post("/authentication", (req, res) => {
  const { username, password } = req.body;

  userService
    .findUserByUsername(username)
    .then((foundUser) => {
      if (!foundUser) {
        res.status(400).json({ message: `Username is not existed` });
        return;
      }

      if (foundUser.password != password) {
        res.status(400).json({ message: `Password is wrong` });
        return;
      }

      return Promise.resolve(foundUser);
    })
    .then((user) => {
      const token = jwt.sign(user.toObject(), JWT_SECRET);
      res.send(token);
    });
});

router.get("/authentication", requireUser, (req, res) => {
  res.json(req.user);
});

module.exports = router;
