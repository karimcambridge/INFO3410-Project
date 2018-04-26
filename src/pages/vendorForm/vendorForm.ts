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
      quote: ['', Validators.compose([Validators.required]), Validators.minLength(4)],
      photo_url: ['', Validators.compose([Validators.required])]
    });
  }

  vendorSignUp() {
    let data = this.vendorForm.value; // data.quote

    alert("Your information has been saved");
  }

  goBack() {
    this.navCtrl.pop();
  }

  redirectToAccount() {
    this.navCtrl.push(LoginPage);
  }
}
