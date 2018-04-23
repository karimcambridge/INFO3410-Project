import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild('loll') loll ;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, params: NavParams) {

  }

  myFunction() {
    alert("Your feedback has been duley noted!"); 
    this.loll= " ";
}

}
