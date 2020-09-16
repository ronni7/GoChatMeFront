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
  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }

  switchChannel(channelID: number) {
    this.channelID = channelID;
    this.emitEventToChild();
  }

}
