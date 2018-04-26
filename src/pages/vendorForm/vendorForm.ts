import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../app/core/auth.service';
import { VendorPage } from '../vendor/vendor';
import { AccountPage } from '../account/account';

@Component({
  selector: 'page-vendorForm',
  templateUrl: 'vendorForm.html'
})
export class VendorFormPage {

  constructor(private navCtrl: NavController,
              public authService: AuthService) {

  }

  vendorSignUp() {
    alert("Your information has been saved");
  }

  goBack() {
    this.navCtrl.setRoot(VendorPage);
  }

  redirectToAccount() {
    this.navCtrl.push(AccountPage);
  }

}
