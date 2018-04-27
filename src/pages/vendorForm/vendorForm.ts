import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../app/core/auth.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-vendorForm',
  templateUrl: 'vendorForm.html'
})
export class VendorFormPage {
  vendorForm: FormGroup;
  vendorError: string;

  constructor(private navCtrl: NavController,
              public authService: AuthService,
              public fb: FormBuilder) {
    this.vendorForm = fb.group({
      tel: ['', Validators.compose([Validators.required, Validators.minLength(7)])],
      category: ['', Validators.compose([Validators.required])],
      quote: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  vendorSignUp() {
    let data = this.vendorForm.value;

    this.authService.addVendor(this.authService.user, data)
    .then(function() {
      console.log("Vendor successfully added!");
      alert("Your information has been saved.");
    })
    .catch(err => {
      console.log('[VENDOR SIGN UP ERROR]: ', err.message);
      alert("Vendor signup failed. Please wait and try again!");
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  redirectToAccount() {
    this.navCtrl.push(LoginPage);
  }
}
