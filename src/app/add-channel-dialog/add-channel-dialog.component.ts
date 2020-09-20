import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Channel} from '../../model/Channel';
import {ChannelService} from '../../service/channel.service';

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.scss']
})
export class AddChannelDialogComponent implements OnInit {
  formGroup: FormGroup;
  @Output() close = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private channelService: ChannelService) {
    this.formGroup = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(4196)]],
        adultsOnly: []
      });
  }

  ngOnInit() {
  }

  dispatch($event: MouseEvent) {
    $event.stopPropagation();
  }

  submit() {
    const body: Channel = new Channel();
    body.name = this.formGroup.value.name;
    body.description = this.formGroup.value.description;
    body.active = true;
    body.adultsOnly = this.formGroup.value.adultsOnly;

    this.channelService.addChannel(body).subscribe(response => {
      if (response) {
        this.closeDialog();
      }
    });
  }

  private closeDialog() {
    this.close.emit();
  }

  isValid() {
    return this.formGroup.valid;
  }
}
