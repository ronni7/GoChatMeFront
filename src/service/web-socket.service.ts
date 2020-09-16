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
  currentRoomID = 1;
  private chatroom: string;
  private chatEndpoint: string;
  public incomingMessages: Message[] = [];

  private username = 'Johnny';

  constructor() {
    this.chatEndpoint = '/chat/';
  }


  connectTo() {
    this.socket = new SockJS('https://localhost:8444/chat');
    this.stompClient = Stomp.over(this.socket);
    this.chatroom = '/chatroom/' + this.currentRoomID; // was /chatroom/notifications/
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
    this.incomingMessages.push(messageOutput);
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

  switchRoom(channelID: number) {
    this.currentRoomID = channelID;
    this.disconnect();
    this.incomingMessages = new Array<Message>();
    this.connectTo();
  }
}
