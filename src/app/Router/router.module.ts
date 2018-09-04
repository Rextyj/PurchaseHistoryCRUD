import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { DisplayComponent } from '../display/display.component';
import { AddItemComponent } from '../add-item/add-item.component';
import {SummaryComponent} from '../summary/summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'display', component: DisplayComponent, outlet: "childrenComponents"},
    {path: 'additem', component: AddItemComponent, outlet: "childrenComponents"},
    {path: 'summary', component: SummaryComponent, outlet: "childrenComponents"}
  ]}
  
];


@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes),BrowserAnimationsModule
  ],
  
  declarations: [],
  exports: [RouterModule],
  
  
})
export class AppRouterModule { }

export const routingComponents = [LoginComponent, SignupComponent, DashboardComponent];