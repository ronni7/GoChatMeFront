import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LeftPanelComponent} from './left-panel/left-panel.component';
import {ChannelService} from '../service/channel.service';
import {HttpClientModule} from '@angular/common/http';
import {MainPanelComponent} from './main-panel/main-panel.component';
import {MessageListComponent} from './message-list/message-list.component';
import {WebSocketService} from '../service/web-socket.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddChannelDialogComponent } from './add-channel-dialog/add-channel-dialog.component';
import { HeaderPanelComponent } from './header-panel/header-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    MainPanelComponent,
    MessageListComponent,
    AddChannelDialogComponent,
    HeaderPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ChannelService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
