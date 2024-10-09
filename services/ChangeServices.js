const fs = require("fs");

class ChangeServices {
  async getUser(users, id) {
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
      return foundUser;
    } else {
      console.log("User not found");
      return null;
    }
  }

  async changeName(id, users, name) {
    const user = users.find((user) => user.id === id);

    if (user) {
      user.name = name;
      const updatedData = { users };
      await fs.promises.writeFile(
        "./users.json",
        JSON.stringify(updatedData, null, 2)
      );

      return { success: true, user };
    }
    return { success: false, message: "User not found" };
  }
}

module.exports = ChangeServices;
