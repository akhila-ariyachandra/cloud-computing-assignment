import { UserType } from '../types';

export class VerifyRequest {
  token: string;
  types: UserType[];
}
