import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:8444/goChatMe/users');
  }

}
