import {Component} from '@angular/core';
import {Subject} from 'rxjs';

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


  switchChannel(channelID: number) {
    this.channelID = channelID;
    this.channelSwitched.next();
  }

  switchPrivateChannel(token: string) {
    this.token = token;
    this.privateChannelSwitched.next(token);
  }

}
