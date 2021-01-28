import {NotificationType} from './enums/NotificationType';

export class Notification {
  from: string;
  body?: string;
  receiverID: number;
  type: NotificationType;
}
