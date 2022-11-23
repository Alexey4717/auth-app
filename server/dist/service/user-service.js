"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid = require('uuid');
const user_model_1 = __importDefault(require("../models/user-model"));
const mail_service_1 = __importDefault(require("./mail-service"));
const token_service_1 = __importDefault(require("./token-service"));
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const api_error_1 = __importDefault(require("../exceptions/api-error"));
class UserService {
    registration(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield user_model_1.default.findOne({ email });
            if (candidate) {
                throw api_error_1.default.BadRequest(`User with email ${email} already exists`);
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 7);
            const activationLink = uuid === null || uuid === void 0 ? void 0 : uuid.v4(); // return random unique string
            const user = yield user_model_1.default.create({
                email,
                password: hashPassword,
                activationLink,
            });
            yield mail_service_1.default.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
            const userDto = new user_dto_1.default(user); // only id, email, isActivated
            const tokens = yield token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    activate(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ activationLink });
            if (!user)
                throw api_error_1.default.BadRequest("Incorrect activation link");
            user.isActivated = true;
            yield user.save();
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                throw api_error_1.default.BadRequest("User with this email not found");
            }
            const isPassEqual = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassEqual) {
                throw api_error_1.default.BadRequest("Incorrect password");
            }
            const userDto = new user_dto_1.default(user);
            const tokens = yield token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_service_1.default.removeToken(refreshToken);
            return token;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_error_1.default.UnauthorizedError();
            }
            const userData = token_service_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw api_error_1.default.UnauthorizedError();
            }
            const user = yield user_model_1.default.findById(userData.id);
            const userDto = new user_dto_1.default(user);
            const tokens = yield token_service_1.default.generateTokens(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = user_model_1.default.find();
            return users;
        });
    }
}
exports.default = new UserService();
