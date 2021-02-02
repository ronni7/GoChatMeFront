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
import {AddChannelDialogComponent} from './add-channel-dialog/add-channel-dialog.component';
import {HeaderPanelComponent} from './header-panel/header-panel.component';
import {LoginPanelTempComponent} from './login-panel/login-panel-temp.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig} from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    MainPanelComponent,
    MessageListComponent,
    AddChannelDialogComponent,
    HeaderPanelComponent,
    LoginPanelTempComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ChannelService, SocialAuthService, WebSocketService, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            'CLIENT_ID_FROM_GOOGLE_CLOUD'
          )
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
