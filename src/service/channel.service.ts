import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Channel} from '../model/Channel';
import {PrivateChannelTO} from '../model/PrivateChannelTO';

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

  addChannel(body: Channel): Observable<Channel> {
    return this.http.post<Channel>('https://localhost:8444/goChatMe/channel/addChannel', body);
  }

  createPrivateChannel(senderID: number, destinationUserNickname: string): Observable<PrivateChannelTO> {
    return this.http.post<PrivateChannelTO>('https://localhost:8444/goChatMe/channel/createPrivateChannel', {
      senderID,
      destinationUserNickname
    });
  }

  accept(token: string): Observable<void> {
    return this.http.post<void>('https://localhost:8444/goChatMe/channel/accept',
      token);
  }
}
