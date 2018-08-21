import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidden = true;

  constructor(private service: CommonService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(formValue){
    //passed in an object
    console.log(formValue);
    this.service.getUser(formValue).subscribe(data => {
        console.log(data.data);
        if(data.data === 'verified'){
          this.router.navigateByUrl('/dashboard');
        } else if(data.data === 'unsuccessful'){
          this.hidden = false;
        }
    });

  }
}
