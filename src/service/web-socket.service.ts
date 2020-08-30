import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MessageType} from '../model/enums/MessageType';
import {Message} from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: SockJS;
  stompClient: any;
  currentRoomID: number = 1;
  private readonly chatroom: string;
  private chatEndpoint: string;
  public incomingMessages: Message[] = [];

  private username = 'Johnny';

  constructor() {
    this.chatroom = '/chatroom/' + this.currentRoomID; // was /chatroom/notifications/
    this.chatEndpoint = '/chat/';
    this.socket = new SockJS('https://localhost:8444/chat');
    this.stompClient = Stomp.over(this.socket);
    console.log('Starting');

  }


  connectTo() {
    this.stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe(
        this.chatroom, messageOutput => (this.receiveMessage(JSON.parse(messageOutput.body))),
        {'username': this.username} // todo this.userService.getUsername();
      );
    }, err => (this.reconnectOnError(err)));
  }

  disconnect() {
    this.stompClient.disconnect();
  }

  receiveMessage(messageOutput: Message) {
    console.log('Message has been received: ', messageOutput);
    this.incomingMessages.push(messageOutput);
  }

  reconnectOnError(error: any) {
    console.log('attempting to reconnect');
    setTimeout(() => {
      this.connectTo();
    }, 5000);
  }

  sendMessage(message?: string) {
    console.log('do tej pory posiadam takie incoming message', this.incomingMessages);
    this.stompClient.send('/chat/' + this.currentRoomID, {},
      JSON.stringify(
        {
          'from': this.username,
          'text': message ? message : 'HELLO IS IT ME U LOOKIN FOR',
          'messageType': MessageType.NORMAL
        }
      ));
  }
}
