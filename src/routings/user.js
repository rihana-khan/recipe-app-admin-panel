const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth")
const userController = require("../controllers/users");

router.get("/", userController.getUsers);
router.delete("/remove_user", checkAuth, userController.removeUser);

module.exports = router;