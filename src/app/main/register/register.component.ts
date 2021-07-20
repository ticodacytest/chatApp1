import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {ApiService} from '../../services/api.service'
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup
  constructor(
    private _api : ApiService,
    private _auth: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(){
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'aplication/json',
      })
    };
    let b = this.form.value
    console.log(b)
    this._api.postTypeRequest('register', b ,HTTP_OPTIONS).subscribe((res: any) => {
      console.log(res)
      //if(res){
       ///// console.log(res)
        //this._auth.setDataInLocalStorage('token', res.access_token)
      alert('User is Registerd');
      this.router.navigate(['login'])
     // }
    }, err => {
      console.log(err)
    });
  }

}
