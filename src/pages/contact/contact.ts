import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  //@ViewChild('feedbackText') feedbackText;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, params: NavParams) {

  }

  submitFeedback() {
    alert("Your feedback has been duley noted!"); 
    //this.feedbackText = "";
  }

}
