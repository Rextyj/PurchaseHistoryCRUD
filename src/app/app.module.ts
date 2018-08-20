import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {CommonService} from './common.service'

import { AppComponent } from './app.component';
import { AppReducer } from './store/reducer';
import { DisplayComponent } from './display/display.component';
import {listEffect} from './store/effect';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule, FormsModule, 
    ReactiveFormsModule, HttpModule,
    StoreModule.forRoot({AppReducer}),
    EffectsModule.forRoot([listEffect])
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
