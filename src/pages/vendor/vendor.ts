import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VendorFormPage } from '../vendorForm/vendorForm';
import { ListVendorPage } from '../vendorList/vendorList';
import { ShopPage } from '../shop/shop'; 


@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html'

})

export class VendorPage {

  constructor(public navCtrl: NavController) {

  }

  // redirects the user to the Vendor Form page when the Vendor Form button is selected
  vendorForm() {
    this.navCtrl.setRoot(VendorFormPage);
  }

  // redirects the user to the Vendor List page when the Vendor List button is selected
  vendorList() {
    this.navCtrl.setRoot(ListVendorPage);
  }

  // redirects the user to the Shop page when the Shop button is selected
  shop() {
    this.navCtrl.setRoot(ShopPage);
  }

}


