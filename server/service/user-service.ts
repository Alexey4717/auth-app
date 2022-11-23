import bcrypt from 'bcrypt';
const uuid = require('uuid');

import UserModel from '../models/user-model';
import mailService from "./mail-service";
import tokenService from "./token-service";
import UserDto from "../dtos/user-dto";
import ApiError from "../exceptions/api-error";


class UserService {
  async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 7);
    const activationLink = uuid?.v4(); // return random unique string

    const user: any = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user); // only id, email, isActivated
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) throw ApiError.BadRequest("Incorrect activation link");
    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user: any = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("User with this email not found");
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest("Incorrect password");
    }

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData: any = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user: any = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = UserModel.find();
    return users;
  }
}

export default new UserService();
