import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VendorFormPage } from '../vendorForm/vendorForm';
import { ListVendorPage } from '../vendorList/vendorList';

@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html'
})

export class VendorPage {

  constructor(public navCtrl: NavController) {

  }
  vendorForm() {
    this.navCtrl.setRoot(VendorFormPage);
  }

  vendorList() {
    this.navCtrl.setRoot(ListVendorPage);
  }

}
