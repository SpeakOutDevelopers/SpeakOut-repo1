import { TabsPage } from '../tabs/tabs';
import { UserProvider } from '../../providers/user-provider';
import { RegisterGenderPage } from '../register-gender/register-gender';
import { Usuario } from '../../commons/entities';
import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { RegisterNamePage } from '../register-name/register-name';
import { LoginPage } from '../login-page/login-page';
import { Slides } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import {CentralController} from '../../controllers/central.controller';

/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  @ViewChild('slides') slides: Slides;

  images = [
    '../../assets/img/intro1text.jpg',
    '../../assets/img/intro2text.jpg',
    '../../assets/img/intro3text.jpg'
  ];
  user: Usuario = {
    nombre:"",
    genero:"",
    universidad:"",
    edad:0,
    email:"",
    img:"",
    idiomas:[],
    $key:"",
    biografia:"",
    tipoAutenticacion:"",
    contrasena:""
  };
  token:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,   
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private fb: Facebook,
    public CC: CentralController,
    private userProvider: UserProvider
    ) {
  }
  ionViewDidLoad(){
    this.slides.autoplay = 5000;
  }
  login(){
    this.navCtrl.push(LoginPage);
  }
  loginFB(){
    this.CC.setFbUserOnCreation(true);
    if (this.platform.is('cordova')) {
      

      this.fb.login(['email', 'public_profile']).then(res => {
          this.token = res.authResponse.accessToken;
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential)
            .then((success) => {
              
              this.userProvider.getUserExistsSubject().subscribe((res)=>{
                alert("intro res: "+JSON.stringify(res));
                if(!res){
                  this.user.$key= success.uid;
                  this.user.nombre = success.displayName;
                  this.user.email = success.email;
                  this.user.img = success.photoURL;
                  this.user.tipoAutenticacion = "facebook";
                  console.log("sucess: "+JSON.stringify(this.user));
                  alert(this.token);
                  this.navCtrl.push(RegisterGenderPage, {
                    user: this.user,
                    token: this.token
                  });
                }else{
                  this.CC.setFbUserOnCreation(false);
                  //this.afAuth.auth.currentUser.reload();
                  //this.navCtrl.setRoot(TabsPage);

                }
              });

              this.userProvider.checkUserExists(success.uid);

            })
            .catch((error) => {
              this.CC.showAlert("error auth: "+JSON.stringify(error.message));
              this.CC.setFbUserOnCreation(false);
          });
      }).catch((err) => {
          this.CC.showAlert("error login: "+ JSON.stringify(err));
          console.log(err);
          this.CC.setFbUserOnCreation(false);

      });
      
    }else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(response => {
          this.user.$key= response.user.uid;
          this.user.nombre = response.user.displayName;
          this.user.email = response.user.email;
          this.user.img = response.user.photoURL;
          this.user.tipoAutenticacion = "facebook";
          console.log(this.user);
          alert(this.token);

          this.navCtrl.push(RegisterGenderPage, {
            user: this.user,
            token: this.token
          });
          
        }).catch((error) => {
          alert(error.message);
          this.CC.setFbUserOnCreation(false);
        });
    }
  }
  
  crearCuenta(){
    this.navCtrl.push(RegisterNamePage);
  }



}
