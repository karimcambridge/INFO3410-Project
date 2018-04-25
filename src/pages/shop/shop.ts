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
            name: 'Anna Breton',
            image: 'assets/imgs/guava.jpg', 
            quantityInCart: 0, 
            price: 4.00, 
            addButtonState: 'idle'
          },
          {
            title: 'Nutmeg', 
            name: 'Karim Cambridge',
            image: '', 
            quantityInCart: 0, 
            price: 20.00, 
            addButtonState: 'idle'
          },
          {
            title: 'Sorrel', 
            name: 'Louis Scott',
            image: 'assets/imgs/sorrel.jpg', 
            quantityInCart: 0, 
            price: 10.00, 
            addButtonState: 'idle'
          },
          {
            title: 'Portugal', 
            name: 'Xia Crawford', 
            image: 'assets/imgs/portugal.jpg',
            quantityInCart: 0, 
            price: 1.00, 
            addButtonState: 'idle'
          },
          {
            title: 'Jewellery', 
            name: 'Brittney Chriton',
            image: 'assets/imgs/jewel1.jpg', 
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