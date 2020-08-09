import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MessageType} from '../model/enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: SockJS;
  stompClient: any;
  currentRoomID: number = 1;
  private readonly chatroom: string;
  private chatEndpoint: string;

  private username = 'Johnny';

  constructor() {
    this.chatroom = '/chatroom/notifications/';
    this.chatEndpoint = '/chat/';
    this.socket = new SockJS('https://localhost:8444/chat');
    this.stompClient = Stomp.over(this.socket);
    console.log('Starting');

  }


  connectTo() {
    this.stompClient.connect({'Access-Control-Allow-Credentials': true}, frame => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe(
        this.chatroom, messageOutput => (this.receiveMessage(messageOutput)),
        {'username': this.username} //this.userService.getUsername();
      );
    }, err => (this.reconnectOnError(err)));
  }

  disconnect() {
    this.stompClient.disconnect();
  }

  receiveMessage(messageOutput) {
    console.log('message', messageOutput);
  }

  reconnectOnError(error: any) {
    console.log('attempting to reconnect');
    setTimeout(() => {
      this.connectTo();
    }, 5000);
  }

  sendMessage(message?: string) {

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
