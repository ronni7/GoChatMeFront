import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {UserContextService} from '../service/user-context.service';
import {Router} from '@angular/router';
import {WebSocketService} from '../service/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'goChatMe';
  channelID: number;
  channelSwitched: Subject<void> = new Subject<void>();
  token: string;
  privateChannelSwitched: Subject<string> = new Subject<string>();
  acceptedUserNickname: Subject<string> = new Subject<string>();

  constructor(private userContextService: UserContextService, private webSocketService: WebSocketService, private router: Router) {
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

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
    this.webSocketService.disconnectPrivate();
    this.userContextService.signOut();
  }

}
