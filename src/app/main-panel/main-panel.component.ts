import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../../service/web-socket.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {
  private messageText: string;

  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.connectTo();
  }

  ngOnInit() {
  }

  sendMessage() {
    this.webSocketService.sendMessage(this.messageText);
  }
}
