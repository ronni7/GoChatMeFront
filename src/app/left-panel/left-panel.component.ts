import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChannelService} from '../../service/channel.service';
import {Channel} from '../../model/Channel';
import {User} from '../../model/User';
import {WebSocketService} from '../../service/web-socket.service';
import {UserContextService} from '../../service/user-context.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {
  @Output() channelSwitched = new EventEmitter<number>();
  @Output() privateChannelSwitched = new EventEmitter<string>();
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

  constructor(private userContextService: UserContextService, private channelService: ChannelService, private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.initData();
    this.selectedChannelID = this.webSocketService.currentRoomID;
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
      this.channelService.getUsersByName(userName).subscribe(response => {
        if (response) {
          this.users = response;
          this.usersDisplayed = this.users;
        }
      });
    } else {
      this.channelService.getUsers().subscribe(response => {
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

  joinPrivateChannel(nickname: string) {
    this.channelService.createPrivateChannel(this.userContextService.userID, nickname).subscribe(response => {
      if (response && !response.exists) {
        this.sendNotification(nickname, response.token);
      }
      this.webSocketService.switchPrivateRoom(response.token);
      this.webSocketService.connectToCreatedPrivateChat(response.token);
      this.selectedNickname = nickname;
      this.privateChannelSwitched.emit(response.token);
      this.viewingPrivateChannel = true;
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

}

