import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider';
import { CentralController } from "../../controllers/central.controller";
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user:any;
  languages = [];

  constructor(public navCtrl: NavController, public userPro: UserProvider, public CC: CentralController, public afAuth: AngularFireAuth ) {

      this.userPro.getCurrentUserObservable().subscribe((user)=>{ 
          this.user=user;
          this.languages=user.idiomas;
       });

      

  }

  signOut() {
    this.CC.setFbUserOnCreation(false);
    this.afAuth.auth.signOut();
  }

  stringToArray(num){
    let number = Number(num);
    let array = new Array(number);

    return array;
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
