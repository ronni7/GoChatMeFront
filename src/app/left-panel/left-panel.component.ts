import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ChannelService} from '../../service/channel.service';
import {Channel} from '../../model/Channel';
import {User} from '../../model/User';
import {WebSocketService} from '../../service/web-socket.service';
import {UserContextService} from '../../service/user-context.service';
import {UserService} from '../../service/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit, OnDestroy {
  @Output() channelSwitched = new EventEmitter<number>();
  @Output() privateChannelSwitched = new EventEmitter<string>();
  @Input() acceptedUserNickname: any;
  private acceptedUserNicknameSubscription: Subscription;
  selectedChannelID: number;
  channels: Array<Channel>;
  channelsDisplayed: Array<Channel>;
  users: Array<User>;
  usersDisplayed: Array<User>;
  channelsExpanded = false;
  channelSearchExpanded = false;
  usersExpanded = false;
  userSearchExpanded = false;
  channelFilterText: string;
  userFilterText: string;
  addChannelVisible = false;
  viewingPrivateChannel = false;
  selectedNickname: string;

  // private privateMessaging: Subscription;

  constructor(public userContextService: UserContextService,
              public channelService: ChannelService,
              public webSocketService: WebSocketService,
              public userService: UserService
  ) {

  }

  ngOnInit() {
    this.initData();
    this.selectedChannelID = this.webSocketService.currentRoomID;
    this.acceptedUserNicknameSubscription = this.acceptedUserNickname.subscribe((nickname) => {
      this.selectedNickname = nickname;
      const element: HTMLElement = document.getElementById(nickname);
      element.click();
    });
  }

  joinChannel(channelID: number) {
    const id = channelID;
    this.viewingPrivateChannel = false;
    this.webSocketService.switchRoom(id);
    this.selectedChannelID = id;
    this.channelSwitched.emit(id);
  }

  private initData() {
    this.getUsers();
    this.getChannels();
  }

  private getUsers(userName?: string) {
    if (userName) {
      this.userService.getUsersByName(userName).subscribe(response => {
        if (response) {
          this.users = response;
          this.usersDisplayed = this.users;
        }
      });
    } else {
      this.userService.getUsers().subscribe(response => {
        if (response) {
          this.users = response;
          this.usersDisplayed = this.users;
        }
      });
    }
  }

  private getChannels(channelName?: string) {
    if (channelName) {
      this.channelService.getChannelsByName(channelName).subscribe(response => {
        if (response) {
          this.channels = response;
          this.channelsDisplayed = this.channels;
        }
      });
    } else {
      this.channelService.getChannels().subscribe(response => {
        if (response) {
          this.channels = response;
          this.channelsDisplayed = this.channels;
        }
      });
    }
  }

  expandChannels() {
    this.channelsExpanded = !this.channelsExpanded;
  }

  showSearch() {
    this.channelSearchExpanded = !this.channelSearchExpanded;
  }

  expandUsers() {
    this.usersExpanded = !this.usersExpanded;
  }

  showUsersSearch() {
    this.userSearchExpanded = !this.userSearchExpanded;
  }

  joinPrivateChannel(nickname?: string) {
    if (nickname) {
      this.selectedNickname = nickname;
    }

    if (this.selectedNickname === this.userContextService.user.nickname) {
      return;
    }
    this.channelService.createPrivateChannel(this.userContextService.user.id, this.selectedNickname).subscribe(response => {
      if (response) {
        if (!response.accepted) {
          this.sendNotification(this.selectedNickname, response.token);
        } else {
          console.log(response);
          this.viewingPrivateChannel = true;
          this.webSocketService.switchPrivateRoom(response.token, response.messageList);
          this.privateChannelSwitched.emit(response.token);
        }
      }
    });
  }

  filterChannels() {
    if (this.channelFilterText) {
      this.channelsDisplayed = this.channels.filter(channel => channel.name.toLocaleUpperCase().includes(this.channelFilterText.toLocaleUpperCase()));
      return;
    } else {
      this.getChannels();
    }
  }

  filterUsers() {
    if (this.userFilterText) {
      this.usersDisplayed = this.users.filter(user => user.name.toLocaleUpperCase().includes(this.userFilterText.toLocaleUpperCase()));
      return;
    } else {
      this.getUsers();
    }
  }

  searchChannels() {
    this.channelFilterText ? this.getChannels(this.channelFilterText) : this.getChannels();
  }

  searchUsers() {
    this.userFilterText ? this.getUsers(this.userFilterText) : this.getUsers();
  }

  toggleAddChannelVisible() {
    this.addChannelVisible = !this.addChannelVisible;
  }

  onDialogClose() {
    this.getChannels();
    this.toggleAddChannelVisible();
  }

  sendNotification(name: string, token: string) {
    this.webSocketService.sendNotification(name, token);
  }

  ngOnDestroy() {
    // this.privateMessaging.unsubscribe();
  }
}

