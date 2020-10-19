import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Channel} from '../model/Channel';
import {User} from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) {
  }

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>('https://localhost:8444/goChatMe/channel/channels');
  }

  getChannelsByName(channelName: string) {
    return this.http.get<Channel[]>('https://localhost:8444/goChatMe/channel/channelsByName?name=' + channelName.trim());
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:8444/goChatMe/users');
  }

  getUsersByName(userName: string): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:8444/goChatMe/usersByName?name=' + userName.trim());
  }

  addChannel(body: Channel): Observable<Channel> {
    return this.http.post<Channel>('https://localhost:8444/goChatMe/channel/addChannel', body);
  }

  createPrivateChannel(senderID: number, destinationUserNickname: string): Observable<PrivateChannelTO> {
    return this.http.post<PrivateChannelTO>('https://localhost:8444/goChatMe/channel/createPrivateChannel', {
      senderID,
      destinationUserNickname
    });
  }

}
