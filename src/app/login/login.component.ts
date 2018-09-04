import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActionAssignOwner } from '../store/action';

/**
 * @description Let users enter login information and allow them to navigate to sign up page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //determine if the warning message for wrong login information should be displayed
  hidden = true;

  constructor(private service: CommonService,
              private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }

  //invoked when user clicks login button
  onLogin(formValue){
    console.log(formValue);
    this.service.getUser(formValue).subscribe(data => {
        console.log(data.data);
        //check if the information verification at the back end is successful
        if(data.data === 'verified'){
          //store the verified user's username in sessionStorage
          sessionStorage.setItem("user", formValue.username);
          //change the owner of the state to whoever is logged in
          this.store.dispatch(new AppActionAssignOwner(formValue.username));
          //navigate to the dashboard component when user is verified
          this.router.navigateByUrl('/dashboard');
        } else if(data.data === 'unsuccessful'){
          this.hidden = false;
        }
    });

  }
}
