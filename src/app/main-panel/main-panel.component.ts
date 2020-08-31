import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../service/web-socket.service';
import {Message} from '../../model/Message';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  private messageText: string;
  messages: Message[] = [];

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.connectTo();
    this.messages = webSocketService.incomingMessages;
  }

  ngOnInit() {
  }

  sendMessage() {
    this.webSocketService.sendMessage(this.messageText);
    this.messageText = '';
  }

}
