import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {WebSocketService} from '../../service/web-socket.service';
import {Notification} from '../../model/Notification';
import {NotificationType} from '../../model/enums/NotificationType';
import {ChannelService} from '../../service/channel.service';
import {UserContextService} from '../../service/user-context.service';

@Component({
  selector: 'app-header-panel',
  templateUrl: './header-panel.component.html',
  styleUrls: ['./header-panel.component.scss']
})
export class HeaderPanelComponent implements OnInit, OnDestroy {
  notificationListExpanded = false;
  notifications: Notification[];
  NotificationType = NotificationType;
  @Output() privateChannelAccepted = new EventEmitter<string>();
  userSettingsExpanded = false;

  constructor(public userContextService: UserContextService, private webSocketService: WebSocketService, public channelService: ChannelService) {
    this.notifications = this.webSocketService.notifications;
  }

  ngOnInit() {
  }

  showNotifications() {
    if (this.userContextService.user.id) {
      this.notificationListExpanded = !this.notificationListExpanded;
      this.userSettingsExpanded = false;
    }
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
    if (this.notifications.length === 0) {
      this.showNotifications();
    }
  }

  logout() {
    this.webSocketService.disconnect();
    this.webSocketService.disconnectPrivate();
    this.userContextService.signOut();
  }

  showUserSettings() {
    this.userSettingsExpanded = !this.userSettingsExpanded;
    this.notificationListExpanded = false;
  }

  ngOnDestroy(): void {
    this.logout()
  }
}
