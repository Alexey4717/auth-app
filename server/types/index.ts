export type AccountPayload = {
  email: string;
  id: string;
  isActivated: boolean;
}

export type UserModelType = {
  email: string;
  _id: string;
  password: string;
  isActivated: boolean;
  activationLink?: string;
}