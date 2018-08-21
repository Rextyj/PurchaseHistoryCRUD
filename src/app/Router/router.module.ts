import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import { DisplayComponent } from '../display/display.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'display', component: DisplayComponent}
];


@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRouterModule { }

export const routingComponents = [LoginComponent, SignupComponent, DashboardComponent];