import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signUp', component: SignupComponent}
];


@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  declarations: [LoginComponent, SignupComponent],
  exports: [RouterModule]
})
export class AppRouterModule { }
