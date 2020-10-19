import {Component, Input, OnInit} from '@angular/core';
import {WebSocketService} from '../../service/web-socket.service';
import {Message} from '../../model/Message';
import {Subject, Subscription} from 'rxjs';
import {User} from '../../model/User';
import {UserContextService} from '../../service/user-context.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  @Input() channelID: number;
  @Input() clear: any;
  @Input() token: any;
  @Input() tokenString: string;
  private messageText: string;
  messages: Message[] = [];
  eventSubject: Subject<void> = new Subject<void>();
  private clearSubscription: Subscription;
  private privateSubscription: Subscription;
  privateMessages: Message[] = [];
  private viewingPrivateConversation = false;

  emitClearEvent() {
    this.viewingPrivateConversation = false;
    this.eventSubject.next();
    this.messages = this.webSocketService.incomingMessages;
  }

  privateSubscriptionEvent() {
    this.emitClearEvent();
    this.eventSubject.next();
    this.viewingPrivateConversation = true;
    this.privateMessages = this.webSocketService.incomingPrivateMessages;
  }

  constructor(private webSocketService: WebSocketService, private userContextService: UserContextService) {
    this.webSocketService.connectTo();
    this.webSocketService.enableNotifications();
    this.messages = this.webSocketService.incomingMessages;
    this.privateMessages = this.webSocketService.incomingPrivateMessages;
  }

  ngOnInit() {
    this.clearSubscription = this.clear.subscribe(() => this.emitClearEvent());
    this.privateSubscription = this.token.subscribe(() => this.privateSubscriptionEvent());
  }

  sendMessage() {
    this.viewingPrivateConversation ? this.webSocketService.sendPrivateMessage(this.tokenString, this.messageText) : this.webSocketService.sendMessage(this.messageText);
    this.messageText = '';
  }

  ngOnDestroy() {
    this.clearSubscription.unsubscribe();
    this.privateSubscription.unsubscribe();
  }

  messsss() {
    this.userContextService.userID = 6;
    this.userContextService.username = 'Dario1'; // or name ?
  }
}
