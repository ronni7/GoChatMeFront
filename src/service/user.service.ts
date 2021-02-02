import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {HttpClient} from '@angular/common/http';
import {LoginRequestBody} from '../model/LoginRequestBody';
import {SocialUser} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:8444/goChatMe/users');
  }

  getUsersByName(userName: string): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:8444/goChatMe/usersByName?name=' + userName.trim());
  }

  logUserIn(loginRequestBody: LoginRequestBody) {
    return this.http.post<User>('https://localhost:8444/goChatMe/login', loginRequestBody);
  }

  register(user: User) {
    return this.http.post<User>('https://localhost:8444/goChatMe/register', user);
  }

  verifyExternalAccount(googleResponse: SocialUser) {
    return this.http.post<User>('https://localhost:8444/goChatMe/verifyExternalAccount', googleResponse);
  }
}
