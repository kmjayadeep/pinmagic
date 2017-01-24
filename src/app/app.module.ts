import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'


import { AppComponent } from './app.component';
import { PinsComponent } from './pins/pins.component';
import { MyPinsComponent } from './my-pins/my-pins.component';

import { PinService } from './pin.service'

const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    component:PinsComponent
  },
  {
    path: 'mypins',
    component: MyPinsComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    PinsComponent,
    MyPinsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [PinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
