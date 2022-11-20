"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const router = (0, express_1.Router)();
router.post("/registration", (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 3, max: 32 }), user_controller_1.default.registration);
router.post("/login", user_controller_1.default.login);
router.post("/logout", user_controller_1.default.logout);
router.get("/activate/:link", user_controller_1.default.activate);
router.get("/refresh", user_controller_1.default.refresh);
// for test
router.get("/users", auth_middleware_1.default, user_controller_1.default.getUsers);
exports.default = router;
