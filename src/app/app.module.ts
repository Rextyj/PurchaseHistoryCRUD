import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AppRouterModule, routingComponents} from './Router/router.module';

import {CommonService} from './common.service'

import { AppComponent } from './app.component';
import { AppReducer } from './store/reducer';
import { DisplayComponent } from './display/display.component';
import {listEffect} from './store/effect';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    LoginComponent,
    SignupComponent,
    routingComponents,
    DashboardComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule, FormsModule, 
    ReactiveFormsModule, HttpModule,
    StoreModule.forRoot({AppReducer}),
    EffectsModule.forRoot([listEffect]),
    AppRouterModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
