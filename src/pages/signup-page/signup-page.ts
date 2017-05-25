import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user-provider';
import {  FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs'; 
import { CentralController } from '../../controllers/central.controller';


/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-signup-page',
  templateUrl: 'signup-page.html',
})
export class SignupPage {

  error: any;
  usuario: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userProvider:UserProvider,
    public af: AngularFireAuth,
    public CC : CentralController,
    public loadingCtrl: LoadingController,

    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
    onSubmit(formData) {
      if(formData.valid) {
        
        this.af.auth.createUserWithEmailAndPassword(
          formData.value.email,
          formData.value.password
        ).then((success) => {

            this.usuario = {
              nombre: formData.value.name,
              email: formData.value.email,
              password: formData.value.password,
              img: 'https://guidelighter.s3.amazonaws.com/uploads/profile/profile_image/162/anonymous.png'
            };

            this.userProvider.createUser(this.usuario, success.uid );
            this.userProvider.setCurrentUser(success.uid);
            this.presentLoadingDefault("Creando usuario...", 4000);
            this.navCtrl.pop();
            this.navCtrl.push(TabsPage);
        
        }).catch(
          (err) => {
          this.CC.showAlert(err.message);
          console.log(err);
          this.error = err;
        });
     }
  }
  presentLoadingDefault(loadingText: string, timeout: number) {
    let loading = this.loadingCtrl.create({
      content: loadingText
    });

    loading.present();

    setTimeout(() => {
      
      loading.dismiss();
    }, timeout);
  }
}
