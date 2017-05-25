import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider';

/**
 * Generated class for the ModifiyProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-modifiy-profile-page',
  templateUrl: 'modifiy-profile-page.html',
})
export class ModifiyProfilePage {

user:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public userPro: UserProvider) {

    this.userPro.getCurrentUserObservable().subscribe((user)=>{ 
          this.user=user;
       });
  }


estado(){

}

guardarCambios(){


}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifiyProfilePage');
  }

}
