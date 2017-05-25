import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  constructor(public navCtrl: NavController,  private afAuth: AngularFireAuth) {

  }
  signOut() {
    this.afAuth.auth.signOut();
  }

}
