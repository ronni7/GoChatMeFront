import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {UserContextService} from '../../service/user-context.service';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-panel-temp',
  templateUrl: './login-panel-temp.component.html',
  styleUrls: ['./login-panel-temp.component.scss']
})
export class LoginPanelTempComponent implements OnInit {
  users: User[];
  selectedUser: User;


  constructor(private router: Router, private userContextService: UserContextService, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUsers().subscribe(response => {
      if (response) {
        this.users = response;
      }
    });
  }

  setUser(user: User) {
    this.selectedUser = user;
    this.userContextService.setUserLogged(user);
  }

  signInWithGoogle() {
    this.userContextService.signInWithGoogle();
  }
}
