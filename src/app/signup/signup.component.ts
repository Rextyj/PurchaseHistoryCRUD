import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  duplicate: boolean = false;

  constructor(private service: CommonService,
    private router: Router) { }

  ngOnInit() {
  }

  onSignup(form) {
    console.log('User input is ', form.value);
    this.service.saveUser(form.value).subscribe(data => {
      console.log('return data is ', data);
      //if successfully saved the user
      if (data.data == 'successful') {
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
