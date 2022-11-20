import { AccountPayload, UserModelType } from '../types';

export default class UserDto implements AccountPayload {
  email;
  id;
  isActivated;

  constructor(model: UserModelType) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
