class LoginController {
  async renderLogin(req, res, next) {
    res.render("login");
  }
  async checkLogin(req, res, next) {
    const users = await req.app.locals.services.users.getUsers();

    const { email, password } = req.body;
    const loginResult = await req.app.locals.services.login.checkLogin(
      email,
      password,
      users
    );

    if (loginResult.success) {
      const user = loginResult.user.name;
      return res.json({ msg: `Welcome ${user} jan` });
    } else {
      return res.render("error", {
        message: "invalid mail al password",
        error: {
          status: 409,
          stack: "{}",
        },
      });
    }
  }
}

module.exports = LoginController;
