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
          ]),
      ]),
      trigger('delButton', [ 
        state('idle', style({
            opacity: '0.3'
        })),
        state('removing', style({
            opacity: '1',
            fontWeight: 'bold'
        })),
        transition('idle <=> removing', animate('300ms linear')),
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
            addButtonState: 'idle',
            delButtonState: 'idle'
          },
          {
            title: 'Jewellery', 
            vendor: 'Brittney Chriton',
            vendorImage: 'assets/imgs/tongue.png',
            image: 'assets/imgs/jewel2.jpg', 
            quantityInCart: 0, 
            price: 30.00, 
            addButtonState: 'idle',
            delButtonState: 'idle'
          },
          {
            title: 'Black Soap', 
            vendor: 'Justin Maxime',
            vendorImage: 'assets/imgs/relieved-face.png',
            image: 'assets/imgs/soap.jpg', 
            quantityInCart: 0, 
            price: 20.00, 
            addButtonState: 'idle',
            delButtonState: 'idle'
          },
          {
            title: 'Nutmeg', 
            vendor: 'Karim Cambridge',
            vendorImage: 'assets/imgs/neutral-face.png',
            image: 'assets/imgs/nutmeg.jpg', 
            quantityInCart: 0, 
            price: 5.00, 
            addButtonState: 'idle',
            delButtonState: 'idle'
          },
          {
            title: 'Sorrel', 
            vendor: 'Louis Scott',
            vendorImage: 'assets/imgs/money.png',
            image: 'assets/imgs/sorrel.jpg', 
            quantityInCart: 0, 
            price: 10.00, 
            addButtonState: 'idle',
            delButtonState: 'idle'
          },
          {
            title: 'Pottery', 
            vendor: 'Ronald Browne',
            vendorImage: 'assets/imgs/clown.png',
            image: 'assets/imgs/pottery.jpg', 
            quantityInCart: 0, 
            price: 60.00, 
            addButtonState: 'idle',
            delButtonState: 'idle'
          },
          {
            title: 'Shea Butter', 
            vendor: 'Sade Bowman', 
            vendorImage: 'assets/imgs/kiss.png',
            image: 'assets/imgs/sheabutter.jpg',
            quantityInCart: 0, 
            price: 40.00, 
            addButtonState: 'idle',
            delButtonState: 'idle'
          },
          {
            title: 'Curry', 
            vendor: 'Xia Crawford', 
            vendorImage: 'assets/imgs/hearteyes.png',
            image: 'assets/imgs/curry.jpg',
            quantityInCart: 0, 
            price: 25.00, 
            addButtonState: 'idle',
            delButtonState: 'idle'
          },
          {
            title: 'Beaded Anklet', 
            vendor: 'Zaria Grant', 
            vendorImage: 'assets/imgs/Skull.png',
            image: 'assets/imgs/anklet.jpg',
            quantityInCart: 0, 
            price: 40.00, 
            addButtonState: 'idle',
            delButtonState: 'idle'
          },

        ];
    }

    // increments the item added to cart by 1
  addToCart(item) {
    item.quantityInCart += 1;
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

  // this function decrements the item in the cart by 1
  delFromCart(item) {
    item.quantityInCart -= 1;
    this.itemsInCart.splice(item);

    item.delButtonState = 'removing';
    this.cartBadgeState = 'removing';
    this.changeDetector.detectChanges();
  }

  //this fucntion resets the states of the buttons back to idle
  delFromCartFinished(item){
    this.cartBadgeState = 'idle';
    item.delButtonState = 'idle';
  }

}