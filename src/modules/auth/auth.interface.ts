export type IGenericAuth = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type IGenericLogin = {
  phoneNumber: string;
  password: string;
};

export type IgenericLoginRespone = {
  refreashToken: string;
  accessToken: string;
};
