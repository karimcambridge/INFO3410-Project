import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../app/core/auth.service';
import { SignupPage } from '../signup/signup';
import { AccountPage } from '../account/account';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: string;

  constructor(private navCtrl: NavController,
              private authService: AuthService,
              public fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  signUpPage(): void {
    this.navCtrl.push(SignupPage);
  }

  login() {
    let data = this.loginForm.value;

    if(!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };

  	this.authService.login(credentials)
    .then(value => {
      console.log('[USER LOGGED IN SUCCESSFULLY]');
      this.navCtrl.setRoot(AccountPage);
    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }

  googleLogin() {
  	this.authService.googleLogin()
  	.then(value => {
      console.log('Nice, it worked!');
      this.navCtrl.setRoot(AccountPage);
    })
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }

}