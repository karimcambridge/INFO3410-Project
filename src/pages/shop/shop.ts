import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'page-shop',
    templateUrl: 'shop.html',
    animations: [
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

export class ShopPage {
    items: Object[] = []
    itemsInCart: Object[] = [];
    cartBadgeState: string = 'idle';
  
    constructor(public navCtrl: NavController,
                private changeDetector: ChangeDetectorRef) {
        this.items = [
          {
            title: 'Guava', 
            vendor: 'Anna Breton',
            vendorImage: 'assets/imgs/Hugging.png',
            image: 'assets/imgs/guava.jpg', 
            quantityInCart: 0, 
            price: 4.00, 
            addButtonState: 'idle'
          },
          {
            title: 'Nutmeg', 
            vendor: 'Karim Cambridge',
            vendorImage: 'assets/imgs/neutral-face.png',
            image: 'assets/imgs/nutmeg.jpg', 
            quantityInCart: 0, 
            price: 5.00, 
            addButtonState: 'idle'
          },
          {
            title: 'Sorrel', 
            vendor: 'Louis Scott',
            vendorImage: 'assets/imgs/money.png',
            image: 'assets/imgs/sorrel.jpg', 
            quantityInCart: 0, 
            price: 10.00, 
            addButtonState: 'idle'
          },
          {
            title: 'Portugal', 
            vendor: 'Xia Crawford', 
            vendorImage: 'assets/imgs/hearteyes.png',
            image: 'assets/imgs/portugal.jpg',
            quantityInCart: 0, 
            price: 1.00, 
            addButtonState: 'idle'
          },
          {
            title: 'Jewellery', 
            vendor: 'Brittney Chriton',
            vendorImage: 'assets/imgs/tongue.png',
            image: 'assets/imgs/jewel2.jpg', 
            quantityInCart: 0, 
            price: 30.00, 
            addButtonState: 'idle'
          }
        ];
    }

    // increments the item added to cart by 1
  addToCart(item) {
    item.quantityInCart += 1;
    item.price += item.price;
    this.itemsInCart.push(item);

    item.addButtonState = 'adding';
    this.cartBadgeState = 'adding';
    this.changeDetector.detectChanges();
  }

  //this fucntion resets the states of the buttons back to idle
  addToCartFinished(item){
    this.cartBadgeState = 'idle';
    item.addButtonState = 'idle';
  }

}