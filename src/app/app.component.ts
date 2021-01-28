import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {UserContextService} from '../service/user-context.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'goChatMe';
  channelID: number;
  channelSwitched: Subject<void> = new Subject<void>();
  token: string;
  privateChannelSwitched: Subject<string> = new Subject<string>();
  acceptedUserNickname: Subject<string> = new Subject<string>();

  constructor(private userContextService: UserContextService, private router: Router) {
    if (!this.userContextService.user) {
      this.router.navigate(['/login']);
    }
  }

  switchChannel(channelID: number) {
    this.channelID = channelID;
    this.channelSwitched.next();
  }

  switchPrivateChannel(token: string) {
    this.token = token;
    this.privateChannelSwitched.next(token);
  }

  switchPrivateUser(nickname: string) {
    this.acceptedUserNickname.next(nickname);
  }
}
