import { Component, OnInit } from '@angular/core';
import {Message} from '../../model/Message';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor() { }

  ngOnInit() {

  }

}
