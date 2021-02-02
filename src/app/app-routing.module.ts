import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPanelTempComponent} from './login-panel/login-panel-temp.component';
import {AppComponent} from './app.component';


const routes: Routes = [
  {path: 'login', component: LoginPanelTempComponent},
  {path: '', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
