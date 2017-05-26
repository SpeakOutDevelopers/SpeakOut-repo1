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
    this.CC.presentLoading("Auntenticando con Facebook");
    this.CC.presentToast("Iniciando auntenticaion...",100);

    if (this.platform.is('cordova')) {
      

      this.fb.login(['email', 'public_profile']).then(res => {
          this.token = res.authResponse.accessToken;
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential).then(
            (success) => {
              // alert("autenticado con fb: "+JSON.stringify(success));
              this.CC.presentToast("Autenticado!",2000);
              
              this.createUserFb(success);

            })
            .catch(
              (error) => {
                this.CC.showAlert("error auth: "+JSON.stringify(error.message));
                //this.CC.setFbUserOnCreation(false);
          });
      }).catch((err) => {
          this.CC.showAlert("Error login: "+ JSON.stringify(err.errorMessage));
      });
      
    }else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
        (response) => {

          //this.CC.showAlert("pop fb login "+ JSON.stringify(response));
          //console.log("pop fb login ",response);
          this.CC.presentToast("Autenticado!",2000);

          this.token = response.credential.accessToken;

          this.createUserFb(response.user);
          
        }).catch(
          (error) => {
            alert(error.message);
            this.CC.dismissLoading();
        });
    }
  }

  createUserFb(success){
    this.user.$key= success.uid;
    this.user.nombre = success.displayName;
    this.user.email = success.email;
    this.user.img = success.photoURL;
    this.user.tipoAutenticacion = "facebook";
    //console.log("usuario parcial con fb: "+JSON.stringify(this.user));

    this.navCtrl.push(RegisterGenderPage, {
      user: this.user,
      token: this.token
    });
  }
  
  crearCuenta(){
    this.navCtrl.push(RegisterNamePage);
  }



}
