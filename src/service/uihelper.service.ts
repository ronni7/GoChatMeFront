import {Injectable} from '@angular/core';
import {SenderType} from '../model/enums/SenderType';

@Injectable({
  providedIn: 'root'
})
export class UIHelperService {

  constructor() {
  }

  getSenderColor(sender: string) {
    if (!sender) {
      return;
    }
    switch (sender) {
      case SenderType.SERVER: {
        return 'message-sender-server';
      }
      default:
        return 'message-sender-user';
    }
  }
}
