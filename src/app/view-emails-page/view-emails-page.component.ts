import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-view-emails-page',
  templateUrl: './view-emails-page.component.html',
  styleUrls: ['./view-emails-page.component.scss']
})
export class ViewEmailsPageComponent implements OnInit {
  emails: any[] = []
  constructor(private readonly router: Router, private readonly jwt:JwtService, private readonly rest: RestService) { }

  ngOnInit(): void {
    this.rest.getUserEmails().then(res => {
      console.log(res.data)
      this.emails=res.data
    })
  }
  signOut(){ 
    this.jwt.removeJwt()
    this.router.navigate(['/'])
  }
}
