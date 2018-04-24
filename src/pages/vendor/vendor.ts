import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { VendorFormPage } from '../vendorForm/vendorForm';
import { ListVendorPage } from '../vendorList/vendorList';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'page-vendor',
  templateUrl: 'vendor.html',
  animations: [
    //
    trigger('cartBadge', [
        state('idle', style({
            opacity: '0.3',
            transform: 'scale(1)'
        })),
        state('adding', style({
            opacity: '1',
            transform: 'scale(1.3)'
        })),
        transition('idle <=> adding', animate('300ms linear')),
        transition('void => *', [
            style({transform: 'translateX(200%)'}),
            animate('300ms ease-in-out')
        ])
    ]),
    trigger('addButton', [ 
        state('idle', style({
            opacity: '0.3'
        })),
        state('adding', style({
            opacity: '1',
            fontWeight: 'bold'
        })),
        transition('idle <=> adding', animate('300ms linear')),
        transition('void => *', [
            style({transform: 'translateX(200%)'}),
            animate('300ms ease-in-out')
        ])
    ])
]
})

export class VendorPage {
  products: string = "items";
  isAndroid: boolean = true;

  items: Object[] = []
  itemsInCart: Object[] = [];
  cartBadgeState: string = 'idle';

  constructor(public navCtrl: NavController,
              platform: Platform,
              private changeDetector: ChangeDetectorRef) {
      this.isAndroid = platform.is('android');
      this.items = [
        {title: 'Guava', quantityInCart: 0, addButtonState: 'idle'},
        {title: 'Watermelon', quantityInCart: 0, addButtonState: 'idle'},
        {title: 'Ginnip', quantityInCart: 0, addButtonState: 'idle'},
        {title: 'Portugal', quantityInCart: 0, addButtonState: 'idle'}
      ];

  }
  vendorForm() {
    this.navCtrl.setRoot(VendorFormPage);
  }

  vendorList() {
    this.navCtrl.setRoot(ListVendorPage);
  }

  // increments the item added to cart by 1
  addToCart(item) {
    item.quantityInCart += 1;
    this.itemsInCart.push(item);

    item.addButtonState = 'adding';
    this.cartBadgeState = 'adding';
    this.changeDetector.detectChanges();
  }

  addToCartFinished(item){
    this.cartBadgeState = 'idle';
    item.addButtonState = 'idle';
}

}


