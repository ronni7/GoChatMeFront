import {Component, OnInit} from '@angular/core';
import {Message} from '../../model/Message';
import {WebSocketService} from '../../service/web-socket.service';
import {InvitationMessage} from '../../model/InvitationMessage';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss']
})
export class HeaderPanelComponent implements OnInit {
  notificationListExpanded = false;
  notifications: InvitationMessage[];

  constructor(private webSocketService: WebSocketService) {
    this.notifications = this.webSocketService.notifications;
  }

  ngOnInit() {
  }

  showNotifications() {
    this.notificationListExpanded = !this.notificationListExpanded;
  }

  dispatchInvitation(notification: InvitationMessage, accept: boolean) {
    if (accept) {
      this.webSocketService.connectToCreatedPrivateChat(notification.token);
    }
    this.notifications.splice(this.notifications.indexOf(notification), 1);
  }
}
