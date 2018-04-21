import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VendorFormPage } from '../vendorForm/vendorForm';
import { ListVendorPage } from '../listVendors/listVendors';

@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html'
})

export class VendorPage {

  constructor(public navCtrl: NavController) {

  }
  vendorform() {
    this.navCtrl.setRoot(VendorFormPage);
  }

  listvendors() {
    this.navCtrl.setRoot(ListVendorPage);
  }

}
