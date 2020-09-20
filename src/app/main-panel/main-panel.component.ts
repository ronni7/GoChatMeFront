import {Component, Input, OnInit} from '@angular/core';
import {WebSocketService} from '../../service/web-socket.service';
import {Message} from '../../model/Message';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  @Input() channelID: number;
  @Input() clear: any;
  private messageText: string;
  messages: Message[] = [];
  eventSubject: Subject<void> = new Subject<void>();
  private clearSubscription: Subscription;

  emitClearEvent() {
    this.eventSubject.next();
    this.messages = this.webSocketService.incomingMessages;
  }

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.connectTo();
    this.messages = this.webSocketService.incomingMessages;
  }

  ngOnInit() {
    this.clearSubscription = this.clear.subscribe(() => this.emitClearEvent());
  }

  sendMessage() {
    this.webSocketService.sendMessage(this.messageText);
    this.messageText = '';
  }

  ngOnDestroy() {
    this.clearSubscription.unsubscribe();
  }

}
