import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpService } from './shared/http.service';
import { UsersService } from './services/get-users.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    HttpService,
    UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
