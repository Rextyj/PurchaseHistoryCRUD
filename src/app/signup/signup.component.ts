import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service : CommonService,
              private router : Router) { }

  ngOnInit() {
  }

  onSignup(formValue) {
    console.log('User input is ', formValue);
    this.service.saveUser(formValue).subscribe(data => {
        console.log('return data is ', data);
        //if successfully saved the user
        if(data.status === 200){
          this.router.navigateByUrl('/login');
        } else {
          //error occured
          console.log('Error signing up');
        }
    });
  }
}
