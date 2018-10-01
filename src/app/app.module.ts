import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PouchDBService } from "./pouchdb.service";
import { BestBuyAPIService } from "./bestbuyapi.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PouchDBService, BestBuyAPIService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
