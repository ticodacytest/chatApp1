import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {ApiService} from '../../services/api.service'
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  constructor(
    private _api : ApiService,
    private _auth: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  login(){
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        "Content-Type": 'application/x-www-form-urlencoded',
      })
    };

    const body = new HttpParams()
      .set('username', this.form.value.username)
      .set("password", this.form.value.password)
      .set('grant_type', 'password');
    let b = this.form.value
    console.log(b)
    this._api.postTypeRequest('login', body, HTTP_OPTIONS).subscribe((res: any) => {
      console.log(res)
      if(res.access_token){
        this._auth.setDataInLocalStorage('token', res.access_token)
        this.router.navigate(['/chat']);
      }
    }, err => {
      alert("username or password is incorrect");
      console.log(err)
    });
  }

}
