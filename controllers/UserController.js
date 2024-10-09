const joi = require("joi");
const bcryptjs = require("bcryptjs");

const schema = joi.object({
  name: joi.string().min(2).max(10).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confrimPassword: joi.ref("password"),
});

class UserController {
  async getUsers(req, res, next) {
    const users = await req.app.locals.services.users.getUsers();
    res.render("users", { users });
  }
  async createUsers(req, res, next) {
    try {
      const user = await schema.validateAsync(req.body);
      await req.app.locals.services.users.createUsers(user);

      //   saveUser(res.locals.users, user);

      res.redirect("/users/login");
      //  res.render('users', {users});
    } catch (error) {
      res.json(error);
    }
  }
  async deleteUsers(req, res, next) {
    const users = await req.app.locals.services.users.getUsers();
    const { id } = await req.params;
    // const { users } = res.locals;
    await req.app.locals.services.users.deleteUsers(users, id);

    const results = users.filter((user) => user.id !== id);
    fs.writeFileSync("./users.json", JSON.stringify({ users: results }));
    res.json(results);
  }
}

module.exports = UserController;
