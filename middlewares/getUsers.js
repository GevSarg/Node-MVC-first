const fs = require("fs");

const getUsers = (req, res, next) => {
  fs.promises
    .readFile("./users.json", "utf-8")
    .then((data) => {
      const users = JSON.parse(data);
      return users;
    })
    .catch((err) => err);
};

module.exports = getUsers;
