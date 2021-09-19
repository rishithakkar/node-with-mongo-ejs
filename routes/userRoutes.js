const express = require("express");
const { signup, signin, users, updateUsers, deleteUser } = require("../controller/userController");
const router = express.Router();
const {
  signupValidation,
  signinValidation,
  updateUserValidation,
} = require("../payloads/user.validation");
const { adminAuthorization, authorization } = require("../utils/authorization");

router.post("/signup", signupValidation, signup);
router.post("/signin", signinValidation, signin);

// Admin routes
router.get("/all", authorization, users);
router.patch("/update/:id", updateUserValidation, adminAuthorization, updateUsers);

router.get("/signup-page", (req, res) => {
  res.render("signup"); //, {pageTitle: "User Signup", path: "/signup", data: ""}
});

router.delete("/delete/:id", adminAuthorization, deleteUser);

module.exports = router;
