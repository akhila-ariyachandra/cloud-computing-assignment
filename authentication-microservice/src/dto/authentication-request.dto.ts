import { UserType } from '../types';

export class AuthenticationRequest {
  id: string;
  type: UserType;
  password: string;
}
