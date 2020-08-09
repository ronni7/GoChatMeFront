import {Component, OnInit} from '@angular/core';
import {ChannelService} from '../../service/channel.service';
import {Channel} from '../../model/Channel';
import {User} from '../../model/User';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {
  channels: Array<Channel>;
  users: Array<User>;
  channelsExpanded: boolean = false;
  searchExpanded: boolean = false;
  usersExpanded: boolean = false;
  userSearch: boolean = false;

  constructor(private channelService: ChannelService) {

  }

  ngOnInit() {
    this.initData();
  }

  joinChannel(channelID: number) {
    console.log('me join channel numero', channelID);
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
    console.log('me work');
    this.channelsExpanded = !this.channelsExpanded;
  }

  shoWSearch() {
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

  showSearch() {
    this.searchExpanded = !this.searchExpanded;
  }

  searchUsers() {
    if(this.users)
    {

    }
  }
}
