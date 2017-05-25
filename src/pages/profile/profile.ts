import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user:any;

  constructor(public navCtrl: NavController, public userPro: UserProvider) {

      this.userPro.getCurrentUserObservable().subscribe((user)=>{ 
          this.user=user;
          console.log(user);
    });


  }

}
