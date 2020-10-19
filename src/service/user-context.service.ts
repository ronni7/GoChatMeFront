import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  username = 'Johnny';
  userID = 1;

  constructor() {
  }
}
