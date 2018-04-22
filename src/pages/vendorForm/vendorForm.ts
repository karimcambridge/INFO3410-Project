import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VendorPage } from '../vendor/vendor';
@Component({
  selector: 'page-vendorForm',
  templateUrl: 'vendorForm.html'
})
export class VendorFormPage {

  constructor(public navCtrl: NavController) {

  }

  goBack() {
    this.navCtrl.setRoot(VendorPage);
  }

}
