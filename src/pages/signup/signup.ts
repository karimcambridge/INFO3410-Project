import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AccountPage } from '../account/account';
import { AuthService } from '../../app/core/auth.service';

@Component({
    selector: 'page-signup',
    templateUrl: './signup.html'
})
export class SignupPage {
    signupError: string;
    signupForm: FormGroup;

    constructor(fb: FormBuilder,
                private navCtrl: NavController,
                private auth: AuthService
    ) {
      this.signupForm = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        display_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        first_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        last_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
      });
  }

  signup() {
        let data = this.signupForm.value;
        let credentials = {
            email: data.email,
            password: data.password,
            display_name: data.display_name,
            first_name: data.first_name,
            last_name: data.last_name
        };
        this.auth.signUp(credentials)
        .then(value => {
          console.log('[USER SIGNED UP]');
          this.navCtrl.setRoot(AccountPage);
        })
        .catch(err => {
          console.log('Something went wrong: ', err.message);
        });
    }
}