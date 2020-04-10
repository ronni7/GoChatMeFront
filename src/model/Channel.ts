export interface Channel {
  channelID: number;
  name: string;
  messageList: Array<any>; // MessageOutputDTO
  description: string;
  active: boolean;
  adultsOnly: boolean;
}
