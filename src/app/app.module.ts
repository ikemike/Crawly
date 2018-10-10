import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PouchDBService } from "./pouchdb.service";
import { BestBuyAPIService } from "./bestbuyapi.service";
import { HttpRequestService } from "./httprequest.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PouchDBService, BestBuyAPIService, HttpRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
