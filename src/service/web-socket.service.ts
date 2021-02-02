import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MessageType} from '../model/enums/MessageType';
import {Message} from '../model/Message';
import {UserContextService} from './user-context.service';
import {Notification} from '../model/Notification';
import {NotificationType} from '../model/enums/NotificationType';

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
  public notifications: Notification[] = [];
  stompClientPrivate: any;
  incomingPrivateMessages: Message[] = [];
  notificationsSocket: SockJS;
  stompClientNotifications: any;


  constructor(private userContextService: UserContextService) {
    this.chatEndpoint = '/chat/';
    this.enableNotifications();
  }


  connectTo() {
    this.socket = new SockJS('https://localhost:8444/chat');
    this.stompClient = Stomp.over(this.socket);
    this.chatroom = '/chatroom/' + this.currentRoomID; // was /chatroom/notifications/
    if (this.userContextService.user) {
      this.stompClient.connect({}, frame => {
        this.stompClient.subscribe(
          this.chatroom, messageOutput => (this.receiveMessage(JSON.parse(messageOutput.body))),
          {username: this.userContextService.user.nickname}
        );
      }, err => (this.reconnectOnError(err)));
    }
  }


  connectToCreatedPrivateChat(token: string) {
    this.privateSocket = new SockJS('https://localhost:8444/chat');
    this.stompClientPrivate = Stomp.over(this.privateSocket);
    this.stompClientPrivate.connect({}, frame => {
      this.stompClientPrivate.subscribe('/chatroom/private/' + token, messageOutput => {
          this.showPrivateMessageOutput(JSON.parse(messageOutput.body));
        },
        {username: this.userContextService.user.nickname});
    }, err => (this.reconnectPrivateOnError(err, token)));
  }

  enableNotifications() {
    this.notificationsSocket = new SockJS('https://localhost:8444/chat');
    this.stompClientNotifications = Stomp.over(this.notificationsSocket);
    if (this.userContextService.user) {
      this.stompClientNotifications.connect({}, frame => {
        this.stompClientNotifications.subscribe('/chatroom/notifications/' + this.userContextService.user.id + '/', notification => {
            this.showNotification(JSON.parse(notification.body));
          },
          {username: this.userContextService.user.nickname});
        this.stompClientNotifications.subscribe('/chatroom/notifications/accepted/' + this.userContextService.user.id + '/', notification => {
            this.showNotification(JSON.parse(notification.body));
          },
          {username: this.userContextService.user.nickname});
      });
    }
  }

  sendNotification(destinationUserNickname: string, token: string) {
    this.stompClient.send('/chat/notifications/' + this.userContextService.user.id, {},
      JSON.stringify({
        from: this.userContextService.user.nickname,
        token,
        receiver: destinationUserNickname,
        type: NotificationType.INVITATION
      }));
  }

  sendInvitationAccepted(notification: Notification) {
    this.stompClient.send('/chat/notifications/accepted/' + this.userContextService.user.id, {},
      JSON.stringify({
        senderID: this.userContextService.user.id,
        token: notification.body,
        receiver: notification.from,
        type: NotificationType.INVITATION_ACCEPTED
      }));
  }

  private showNotification(notification: Notification) {
    this.notifications.push(notification);
  }

  sendMessage(message?: string) {
    this.stompClient.send('/chat/' + this.currentRoomID, {},
      JSON.stringify(
        {
          from: this.userContextService.user.nickname,
          text: message ? message : 'HELLO IS IT ME U LOOKIN FOR',
          messageType: MessageType.NORMAL
        }
      ));
  }

  sendPrivateMessage(token: string, message: string) {
    this.stompClient.send('/chat/private/' + token, {},
      JSON.stringify(
        {
          from: this.userContextService.user.nickname,
          text: message,
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

  switchPrivateRoom(token: string, messages?: Array<Message>) {
    this.disconnectPrivate();
    this.incomingPrivateMessages = messages ? messages : new Array<Message>();
    this.connectToCreatedPrivateChat(token);
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }

  disconnectPrivate() {
    if (this.stompClientPrivate) {
      this.stompClientPrivate.disconnect();
    }
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
