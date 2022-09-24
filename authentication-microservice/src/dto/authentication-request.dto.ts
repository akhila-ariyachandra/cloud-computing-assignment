export class AuthenticationRequest {
  id: string;
  type: 'USER' | 'ADMIN' | 'STATION';
  password: string;
}
