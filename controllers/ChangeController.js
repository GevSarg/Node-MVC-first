class ChangeController {
  async getName(req, res, next) {
    try {
      const { id } = req.params;
      const users = await req.app.locals.services.users.getUsers();
      const user = await req.app.locals.services.change.getUser(users, id);

      if (user) {
        res.render("change", { user });
      } else {
        res.render("error", { message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async changeName(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const users = await req.app.locals.services.users.getUsers();

      const result = await req.app.locals.services.change.changeName(
        id,
        users,
        name
      );

      if (result.success) {
        return res.redirect("/users");
      } else {
        return res.render("error", { message: result.message });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ChangeController;
