import {Message} from './Message';

export class Channel {
  constructor() {

  }

  channelID: number;
  name: string;
  messageList: Array<Message> = []; // MessageOutputDTO
  description: string;
  active: boolean;
  adultsOnly: boolean;
}
