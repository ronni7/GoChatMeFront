import {Message} from './Message';

class PrivateChannelTO {
  channelID: number;
  token: string;
  accepted: boolean;
  messageList: Array<Message>;
}
