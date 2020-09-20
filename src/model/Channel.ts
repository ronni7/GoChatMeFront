export class Channel {
  constructor() {

  }

  channelID: number;
  name: string;
  messageList: Array<any> = []; // MessageOutputDTO
  description: string;
  active: boolean;
  adultsOnly: boolean;
}
