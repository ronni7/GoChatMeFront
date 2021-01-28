import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../model/Message';
import {UIHelperService} from '../../service/uihelper.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit, OnDestroy {
  @Input() messages: Message[] = [];
  @Input() clear: any;
  private clearSubscription: Subscription;

  constructor(public uiHelperService: UIHelperService) {
  }

  ngOnInit() {
    this.clearSubscription = this.clear.subscribe(() => this.clearMessages());
  }

  private clearMessages() {
    this.messages = [];
  }

  ngOnDestroy() {
    this.clearSubscription.unsubscribe();
  }

}
