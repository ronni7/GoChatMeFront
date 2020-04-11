import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LeftPanelComponent} from './left-panel/left-panel.component';
import {ChannelService} from '../service/channel.service';
import {HttpClientModule} from '@angular/common/http';
import { MainPanelComponent } from './main-panel/main-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    MainPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ChannelService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
