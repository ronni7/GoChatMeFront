import {Message} from './Message';

export class PrivateChannelTO {
  token: string;
  accepted: boolean;
  messageList: Array<Message>;
}
