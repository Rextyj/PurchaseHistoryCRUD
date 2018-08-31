import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AppRouterModule, routingComponents} from './Router/router.module';
import {CommonService} from './common.service';
import {LocalStorageService} from './caching.service'
// adding cache support from rxjs -cj
import { AppComponent } from './app.component';
import { AppReducer } from './store/reducer';
import { DisplayComponent } from './display/display.component';
import {listEffect} from './store/effect';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemComponent } from './add-item/add-item.component';
import {SummaryComponent} from './summary/summary.component';
// adding animation module -cj
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Cacheable } from 'ngx-cacheable';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestCache } from './request-cache.service';
import { CachingInterceptor } from './caching-interceptor.service';
import { StorageServiceModule } from 'angular-webstorage-service';



@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    LoginComponent,
    SignupComponent,
    routingComponents,
    DashboardComponent,
    AddItemComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule, FormsModule, 
    ReactiveFormsModule, HttpModule,HttpClientModule,
    StoreModule.forRoot({AppReducer}),
    EffectsModule.forRoot([listEffect]),
    AppRouterModule,
    StorageServiceModule

  ],
  providers: [CommonService,LocalStorageService,
  ],
    // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
