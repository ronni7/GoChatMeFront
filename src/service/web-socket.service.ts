import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MessageType} from '../model/enums/MessageType';
import {Message} from '../model/Message';
import {UserContextService} from './user-context.service';
import {InvitationMessage} from '../model/InvitationMessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: SockJS;
  privateSocket: SockJS;
  stompClient: any;
  currentRoomID = 1;
  private chatroom: string;
  private chatEndpoint: string;
  public incomingMessages: Message[] = [];
  public notifications: InvitationMessage[] = [];
  stompClientPrivate: any;
  incomingPrivateMessages: Message[] = [];

  constructor(private userContextService: UserContextService) {
    this.chatEndpoint = '/chat/';

  }


  connectTo() {
    this.socket = new SockJS('https://localhost:8444/chat');
    this.stompClient = Stomp.over(this.socket);
    this.chatroom = '/chatroom/' + this.currentRoomID; // was /chatroom/notifications/
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(
        this.chatroom, messageOutput => (this.receiveMessage(JSON.parse(messageOutput.body))),
        {username: this.userContextService.username}
      );
    }, err => (this.reconnectOnError(err)));
    // this.enableNotifications();
  }


  connectToCreatedPrivateChat(token: string) {
    this.privateSocket = new SockJS('https://localhost:8444/chat');
    this.stompClientPrivate = Stomp.over(this.privateSocket);
    //    // async error
    this.stompClientPrivate.connect({}, frame => {
      this.stompClientPrivate.subscribe('/chatroom/private/' + token, messageOutput => {
          this.showPrivateMessageOutput(JSON.parse(messageOutput.body));
        },
        {username: this.userContextService.username});
    }, err => (this.reconnectPrivateOnError(err, token)));
    // this.enableNotifications(); // ?
  }

  enableNotifications() {
    this.privateSocket = new SockJS('https://localhost:8444/chat');
    this.stompClientPrivate = Stomp.over(this.privateSocket);
    // undefined
    this.stompClientPrivate.connect({}, frame => {
      this.stompClientPrivate.subscribe('/chatroom/notifications/' + this.userContextService.userID + '/', notification => {
          this.showNotification(JSON.parse(notification.body));
        },
        {username: 'nick'});
    });
  }

  sendNotification(destinationUserNickname: string, token: string) {
    this.stompClient.send('/chat/notifications/' + this.userContextService.userID, {},
      JSON.stringify({from: this.userContextService.username, token, receiver: destinationUserNickname}));
  }

  private showNotification(message: InvitationMessage) {
    this.notifications.push(message);
  }

  sendMessage(message?: string) {
    this.stompClient.send('/chat/' + this.currentRoomID, {},
      JSON.stringify(
        {
          from: this.userContextService.username,
          text: message ? message : 'HELLO IS IT ME U LOOKIN FOR',
          messageType: MessageType.NORMAL
        }
      ));
  }

  sendPrivateMessage(token: string, message?: string) {
    this.stompClient.send('/chat/private/' + token, {},
      JSON.stringify(
        {
          from: this.userContextService.username,
          text: message ? message : 'HELLO IS IT ME U LOOKIN FOR',
          messageType: MessageType.NORMAL
        }
      ));
  }

  receiveMessage(messageOutput: Message) {
    this.incomingMessages.push(messageOutput);
  }

  private showPrivateMessageOutput(message: Message) {
    this.incomingPrivateMessages.push(message);
  }

  switchRoom(channelID: number) {
    this.currentRoomID = channelID;
    this.disconnect();
    this.incomingMessages = new Array<Message>();
    this.connectTo();
  }

  switchPrivateRoom(token: string) {
    this.disconnectPrivate();
    this.incomingPrivateMessages = new Array<Message>();
    this.connectToCreatedPrivateChat(token);
  }

  disconnect() {
    this.stompClient.disconnect();
  }

  disconnectPrivate() {
    this.stompClientPrivate.disconnect();
  }

  reconnectOnError(error: any) {
    setTimeout(() => {
      this.connectTo();
    }, 5000);
  }

  reconnectPrivateOnError(error: any, token: string) {
    setTimeout(() => {
      this.connectToCreatedPrivateChat(token);
    }, 5000);
  }
}
