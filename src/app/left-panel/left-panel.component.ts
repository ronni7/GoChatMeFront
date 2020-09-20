import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChannelService} from '../../service/channel.service';
import {Channel} from '../../model/Channel';
import {User} from '../../model/User';
import {WebSocketService} from '../../service/web-socket.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {
  @Output() channelSwitched = new EventEmitter<number>();
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

  constructor(private channelService: ChannelService, private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.initData();
    this.selectedChannelID = this.webSocketService.currentRoomID;
  }

  joinChannel(channelID: number) {
    this.webSocketService.switchRoom(channelID);
    this.selectedChannelID = channelID;
    this.channelSwitched.emit(channelID);
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

  joinPrivateChannel(id: number) {
    console.log('opening private chat with' + id);
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
}
