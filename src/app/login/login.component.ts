import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/state';
import { AppActionAssignOwner } from '../store/action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidden = true;

  constructor(private service: CommonService,
              private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
  }

  onLogin(formValue){
    //passed in an object
    console.log(formValue);
    this.service.getUser(formValue).subscribe(data => {
        console.log(data.data);
        if(data.data === 'verified'){
          //change the owner of the state to whoever is logged in
          this.store.dispatch(new AppActionAssignOwner(formValue.username));
          this.router.navigateByUrl('/dashboard');
        } else if(data.data === 'unsuccessful'){
          this.hidden = false;
        }
    });

  }
}
