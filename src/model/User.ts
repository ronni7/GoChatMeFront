export class User {
  id: number;//fixme  long type
  name: string;
  surname: string;
  login: string;
  nickname: string;
  password: string;
  email: string;
  sex: 'male' | 'female'; // or 0 | 1
}
