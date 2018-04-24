import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../app/core/auth.service';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController,
              private authService: AuthService) {
  }

  signUpPage(): void {
    this.navCtrl.push(SignupPage);
  }

}