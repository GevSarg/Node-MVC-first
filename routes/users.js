// users.js Router
const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const LoginController = require("../controllers/LoginController");
const ChangeController = require("../controllers/ChangeController");

const userController = new UserController();
const loginController = new LoginController();
const changeController = new ChangeController();

router.get("/", userController.getUsers);

router.post("/", userController.createUsers);

router.get("/change/:id", changeController.getName);

router.post("/change/:id", changeController.changeName);

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", loginController.checkLogin);

router.delete("/:id", userController.deleteUsers);

module.exports = router;
