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
  users: Array<User>;
  channelsExpanded = false;
  searchExpanded = false;
  usersExpanded = false;
  userSearch = false;

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
    this.channelService.getUsers().subscribe(response => {
      if (response) {
        this.users = response;
      }
    });
    this.channelService.getChannels().subscribe(response => {
      if (response) {
        this.channels = response;
      }
    });
  }

  expandChannels() {
    this.channelsExpanded = !this.channelsExpanded;
  }

  showSearch() {
    this.searchExpanded = !this.searchExpanded;
  }

  expandUsers() {
    this.usersExpanded = !this.usersExpanded;
  }

  showUsersSearch() {
    this.userSearch = !this.userSearch;
  }

  joinPrivateChannel(id: number) {
    console.log('opening private chat with' + id);
  }

  searchUsers() {
    if (this.users) {

    }
  }
}
