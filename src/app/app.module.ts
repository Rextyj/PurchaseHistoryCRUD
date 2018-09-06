import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRouterModule, routingComponents } from './router/router.module';
import { ProductInterfaceImpl } from './productService/productInterfaceImpl.service';
import { SecurityInterfaceImpl } from './securityService/securityInterfaceImpl.service';
import { AppComponent } from './app.component';
import { AppReducer } from './store/reducer';
import { ItemDisplayComponent } from './viewItems/viewItems.component';
import { listEffect } from './store/effect';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemComponent } from './add-item/add-item.component';
import { SummaryComponent } from './summary/summary.component';
// adding animation module -cj
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemDisplayComponent,
    LoginComponent,
    SignupComponent,
    routingComponents,
    DashboardComponent,
    AddItemComponent,
    SummaryComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule,
    ReactiveFormsModule, HttpModule,
    StoreModule.forRoot({ AppReducer }),
    EffectsModule.forRoot([listEffect]),
    AppRouterModule
  ],
  providers: [ProductInterfaceImpl, SecurityInterfaceImpl],
  bootstrap: [AppComponent]
})
export class AppModule { }
