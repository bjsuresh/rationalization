import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppSettings } from '../util/appSetting';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private apiService: ApiService
    ) { }

  // username: string | undefined;
  // password: string | undefined;

  tag_seletion: any;
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  login() {
    // console.log(this.loginForm?.value);
    let postValue = {
      "UserName": this.username.value,
      "Password": this.password.value,
      "grant_type": "password"
    };
    let userName = this.username.value;
   
        // postValue['UserName'] = this.username;
    // postValue['Password'] = this.password;
    // postValue['grant_type'] = 'password';
    this.apiService.tokenLogin(postValue).subscribe(
      (resData: any) => {
        console.log('response --->', resData);
        if (userName !== null) {
          localStorage.setItem('userName', userName);
        }
        if ('access_token' in resData) {
          localStorage.setItem('token', resData['access_token']);
          sessionStorage.removeItem(AppSettings.SS_EXPIRED);
          localStorage.setItem('auth', JSON.stringify(resData));
          const nowTime = new Date();
          localStorage.setItem('auth_at', nowTime.toString());

          let snackBarRef = this._snackBar.open('Login Successfully','',{
            duration: 2000
          });
          this.router.navigate(['home/rationalisation']);
          snackBarRef.dismiss();
        } else {
          this._snackBar.open('Invalid username or password', '', {
            duration: 2000
          });
        }
      },
      (err) => {
        console.log(err);
        if (err.error && err.error.error_description) {
          this._snackBar.open(err.error.error_description, '', {
            duration: 2000
          });
        } else {
          this._snackBar.open('An error occurred while logging in', '', {
            duration: 2000
          });
        }
      }
    );
    
  }

  // login() : void {
  //     const enteredUsername = this.username.value;
  //     const enteredPassword = this.password.value;    
  //     if (enteredUsername === 'admin' && enteredPassword === 'admin@123') {
  //       this.router.navigate(["home"]);
  //     } else {
  //       let snackBarRef = this._snackBar.open('Invalid credentials','',{
  //         duration: 3000
  //       });
  //     }
  // }
}
