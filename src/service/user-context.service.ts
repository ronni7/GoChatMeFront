import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  user: User;
  socialUser: SocialUser;
  loggedWithGoogle = false;


  constructor(private router: Router, private authService: SocialAuthService, private userService: UserService) {
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(googleResponse => {
      if (googleResponse) {
        this.userService.verifyExternalAccount(googleResponse).subscribe(response => {
          this.user = response as User;
          this.loggedWithGoogle = true;
          this.router.navigate(['/']);
        });
      }
    }, error => console.log(error));
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    if (this.loggedWithGoogle) {
      this.authService.signOut();
    }
    this.user = null;
    this.router.navigate(['/login']);
  }

  setUserLogged(user: User) {
    this.user = user;
  }
}
