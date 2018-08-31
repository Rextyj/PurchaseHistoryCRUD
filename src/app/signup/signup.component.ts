import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

/**
 * @description Let users to register accounts and allow them to navigate to log in page
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //indication of whether the username has been used already 
  duplicate: boolean = false;

  constructor(private service: CommonService,
    private router: Router) { }

  ngOnInit() {
  }

  //invoked when user clicked signup button
  onSignup(form) {
    console.log('User input is ', form.value);
    //call the saveUser method
    this.service.saveUser(form.value).subscribe(data => {
      console.log('return data is ', data);
      //if successfully saved the user
      if (data.data == 'successful') {
        //navigate to the sign in page
        this.router.navigateByUrl('/login');
      } else {
        if(data.duplicate == true){
          //usename already exists
          console.log('Please select another username');
          this.duplicate = true;
        } else {
          //error occured
        console.log('Error signing up');
        console.log(data);
        }
        //reset the form after submit
        form.reset();
      }
    });
  }
}
