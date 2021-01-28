import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from '../../service/web-socket.service';
import {Message} from '../../model/Message';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit, OnDestroy {

  @Input() channelID: number;
  @Input() clear: any;
  @Input() token: any;
  @Input() tokenString: string;
  public viewingPrivateConversation: boolean;
  messageText: string;
  messages: Message[] = [];
  privateMessages: Message[] = [];
  eventSubject: Subject<void> = new Subject<void>();
  private clearSubscription: Subscription;
  private privateSubscription: Subscription;

  constructor(private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.viewingPrivateConversation = true;
    this.webSocketService.connectTo();
    this.webSocketService.enableNotifications();
    this.messages = this.webSocketService.incomingMessages;
    this.privateMessages = this.webSocketService.incomingPrivateMessages;
    this.clearSubscription = this.clear.subscribe(() => this.emitClearEvent());
    this.privateSubscription = this.token.subscribe(() => this.emitPrivateClearEvent());
    this.viewingPrivateConversation = false;
  }

  sendMessage() {
    if (this.messageText) {
      this.viewingPrivateConversation ? this.webSocketService.sendPrivateMessage(this.tokenString, this.messageText) : this.webSocketService.sendMessage(this.messageText);
    }
    this.messageText = '';
  }


  emitClearEvent() {
    this.viewingPrivateConversation = false;
    this.eventSubject.next();
    this.messages = this.webSocketService.incomingMessages;
  }

  emitPrivateClearEvent() {
    this.viewingPrivateConversation = true;
    this.eventSubject.next();
    console.log('porzeciez lol', this.webSocketService.incomingPrivateMessages);
    this.privateMessages = this.webSocketService.incomingPrivateMessages;
  }

  ngOnDestroy() {
    this.clearSubscription.unsubscribe();
    this.privateSubscription.unsubscribe();
  }

}
