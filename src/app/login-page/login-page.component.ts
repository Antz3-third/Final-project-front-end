import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  public email: string = '';
  public password: string = '';

  constructor(private readonly router: Router, private fb: FormBuilder, private readonly rest: RestService, private readonly jwt:JwtService) {this.loginForm = this.fb.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]]
  });
} 

  ngOnInit(): void {
  }
  logIn() {
    this.rest.logIn(this.loginForm.value).then(res => {
      if (res.error) {
        console.log('logIn', res)
        //this.errorMsg = res.msg;
      } else {
        console.log('logIn', res)
        this.jwt.setJwt(res.data);
        this.router.navigate(['/view-emails'])
       }
   });
  }
    }
