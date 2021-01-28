import {Injectable} from '@angular/core';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  user: User;

  constructor() {

  }

  setUser(user: User) {
    this.user = user;
  }
}
