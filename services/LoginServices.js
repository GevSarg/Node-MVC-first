const bcryptjs = require("bcryptjs");

class LoginServices {
  async checkLogin(email, password, users) {
    const user = users.find((user) => user.email === email);
    if (user) {
      const isValidPassword = bcryptjs.compareSync(password, user.password);
      if (isValidPassword) {
        // console.log(user);

        return { success: true, user };
      }
    }
    return { success: false };
  }
}

module.exports = LoginServices;
