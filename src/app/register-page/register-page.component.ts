import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public errMessage: string = '';
  public registerForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly router: Router, private readonly jwt:JwtService, private readonly rest:RestService) {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required,Validators.email]],
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
   }

  ngOnInit(): void {
  }
  register(){
    this.rest.register(this.registerForm.value).then((res) => {
      if (res.error) {
       this.errMessage = res.msg;
      } else { console.log(res.data)
        this.jwt.setJwt(res.data);
    }
    this.router.navigate(['/'])
    });
  }
}