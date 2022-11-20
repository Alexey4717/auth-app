const Router = require("express").Router;
const { body } = require("express-validator");

const userControllers = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userControllers.registration
);
router.post("/login", userControllers.login);
router.post("/logout", userControllers.logout);
router.get("/activate/:link", userControllers.activate);
router.get("/refresh", userControllers.refresh);
// for test
router.get("/users", authMiddleware, userControllers.getUsers);

module.exports = router;
