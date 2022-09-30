export interface UserCredentials {
  email: string;
  password: string;
}

export interface JwtToken {
  token: string,
}

export interface User extends UserCredentials {
  username: string;
  role: string;
}

export interface UserId extends User {
  id: number;
}
