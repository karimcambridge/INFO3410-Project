import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup } from '@angular/forms';

import { LoggerService } from '../../services/log4ts/logger.service';

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  credentialsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private logger: LoggerService) {
    
    this.credentialsForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onsignIn() {
    this.logger.info('SignInPage: onSignIn()');
  }

  onForgotPassword() {
    this.logger.info('SignInPage: onForgotPassword()');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

}
