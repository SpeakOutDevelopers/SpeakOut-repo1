import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user:any;
  languages = [];

  constructor(public navCtrl: NavController, public userPro: UserProvider) {

      this.userPro.getCurrentUserObservable().subscribe((user)=>{ 
          this.user=user;
          console.log(user);
          this.languages=user.idiomas;
       });

      

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
