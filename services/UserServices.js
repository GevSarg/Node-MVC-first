const fs = require("fs");
const bcryptjs = require("bcryptjs");

class UserServices {
  async getUsers() {
    return fs.promises
      .readFile("./users.json", "utf-8")
      .then((data) => {
        const users = JSON.parse(data).users;
        return users;
      })
      .catch((err) => err);
  }
  async createUsers(user) {
    user.id = crypto.randomUUID();
    delete user.confrimPassword;
    const hashPassword = bcryptjs.hashSync(user.password, 10);
    user.password = hashPassword;

    fs.promises
      .readFile("./users.json", "utf-8")
      .then((data) => {
        const users = JSON.parse(data).users;
        const updatedData = { users: [...users, user] };
        fs.promises
          .writeFile("./users.json", JSON.stringify(updatedData))
          .then((res) => {
            console.log(res);
          });
      })
      .catch((err) => err);
  }
  async deleteUsers(users, id) {
    const results = users.filter((user) => user.id !== id);
    fs.writeFileSync("./users.json", JSON.stringify({ users: results }));
    res.json(results);
  }
}

module.exports = UserServices;
