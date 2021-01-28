import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Message} from '../../model/Message';
import {WebSocketService} from '../../service/web-socket.service';
import {Notification} from '../../model/Notification';
import {NotificationType} from '../../model/enums/NotificationType';
import {ChannelService} from '../../service/channel.service';
import {log} from 'util';
import {not} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss']
})
export class HeaderPanelComponent implements OnInit {
  notificationListExpanded = false;
  notifications: Notification[];
  NotificationType = NotificationType;
  @Output() privateChannelAccepted = new EventEmitter<string>();

  constructor(private webSocketService: WebSocketService, public channelService: ChannelService) {
    this.notifications = this.webSocketService.notifications;
  }

  ngOnInit() {
  }

  showNotifications() {
    this.notificationListExpanded = !this.notificationListExpanded;
  }

  dispatchNotification(notification: Notification, accept: boolean) {
    if (notification.type === NotificationType.INVITATION && accept) {
      this.channelService.accept(notification.body).subscribe(response => {
        this.webSocketService.sendInvitationAccepted(notification);
        this.privateChannelAccepted.emit(notification.from);
      });

    }
    if (notification.type === NotificationType.INVITATION_ACCEPTED && accept) {
        this.privateChannelAccepted.emit(notification.from);
    }
    this.notifications.splice(this.notifications.indexOf(notification), 1);
  }
}
