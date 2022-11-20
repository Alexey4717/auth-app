import { Router } from "express";
import { body } from  "express-validator";

import userControllers from "../controllers/user-controller";
import authMiddleware from "../middlewares/auth-middleware";


const router = Router();

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

export default router;
