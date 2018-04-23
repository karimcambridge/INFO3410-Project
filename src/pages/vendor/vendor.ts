import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { VendorFormPage } from '../vendorForm/vendorForm';
import { ListVendorPage } from '../vendorList/vendorList';

@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html'
})

export class VendorPage {
  products: string = "items";
  isAndroid: boolean = false;

  constructor(public navCtrl: NavController,
              platform: Platform) {
      this.isAndroid = platform.is('android');

  }
  vendorForm() {
    this.navCtrl.setRoot(VendorFormPage);
  }

  vendorList() {
    this.navCtrl.setRoot(ListVendorPage);
  }

  add2Cart() {
    
  }

}


