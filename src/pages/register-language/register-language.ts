import { TabsPage } from '../tabs/tabs';
import { UserProvider } from '../../providers/user-provider';
import { Usuario } from '../../commons/entities';
import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import { EventProvider } from '../../providers/event-provider';
import { CentralController } from '../../controllers/central.controller';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the RegisterLanguagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register-language',
  templateUrl: 'register-language.html',
})
export class RegisterLanguagePage {

  user: Usuario;
  token: any;

  todosIdiomas = [];
  idiomaSelecionadoImg: any;

  idiomaSeleccionado: any;
  languages = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public alertCtrl: AlertController,
    public CC: CentralController,
    private afAuth: AngularFireAuth,
    public userProvider: UserProvider

    ) {
      this.user = this.navParams.get("user");
      this.token = this.navParams.get("token");

      alert("token :"+this.token);

      this.eventProvider.getIdiomasObservable().subscribe((idiomas) => {
        this.todosIdiomas = idiomas;
        console.log(this.todosIdiomas);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterLanguagePage');
  }

  selectLanguage(languageName){
    let index = this.languageListPosition(this.idiomaSeleccionado);
    let newIndex = this.languageListPosition(languageName);

   
    if(this.idiomaSeleccionado==null || index==-1){
      
      this.idiomaSeleccionado = languageName;
      this.idiomaSelecionadoImg = this.todosIdiomas[newIndex].img;
      this.todosIdiomas[newIndex].img = 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png';
    
    }else{
      this.todosIdiomas[index].img = this.idiomaSelecionadoImg;
      this.idiomaSeleccionado = languageName;
      this.idiomaSelecionadoImg = this.todosIdiomas[newIndex].img;
      this.todosIdiomas[newIndex].img = 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png';
    }
  }

   addLanguage(){
    if(this.idiomaSeleccionado == null || this.idiomaSeleccionado == ''){
      this.CC.showAlert("No se ha escogido un idioma");
      return null;
    }
    let nivelIdioma;
    let alert = this.alertCtrl.create();
      alert.setTitle('Nivel de idioma '+ this.idiomaSeleccionado);

      alert.addInput({
        type: 'radio',
        label: '1',
        value: '1',
        checked: true
      });
      alert.addInput({
        type: 'radio',
        label: '2',
        value: '2'
      });
      alert.addInput({
        type: 'radio',
        label: '3',
        value: '3'
      });
      alert.addInput({
        type: 'radio',
        label: '4',
        value: '4'
      });
      alert.addInput({
        type: 'radio',
        label: '5',
        value: '5'
      });

      alert.addButton('Cancel');
      alert.addButton({
        text: 'Okay',
        handler: (data) => {
          console.log('Checkbox data:', data); 
          nivelIdioma = data;

          this.languages.push({
            nombre: this.idiomaSeleccionado,
            nivel: nivelIdioma
          });
          let index = this.languageListPosition(this.idiomaSeleccionado);
          this.todosIdiomas.splice(index,1);
        }
      });
      alert.present();
  }

  languageListPosition(languageName){
    return this.todosIdiomas.findIndex(x => x.nombre === languageName);
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
   stringToArray(num){
    let number = Number(num);
    let array = new Array(number);

    return array;
  }
  createUser(){
    this.user.idiomas = this.languages;
    
    if(this.user.idiomas.length == 0){
      return null;
    }
    alert("regist-lang creation user: "+JSON.stringify(this.user));
    if(this.user.tipoAutenticacion == "simple"){
      alert("auth simple");
      this.afAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.contrasena
      ).then((success) =>{
        this.CC.presentLoading("Creando usuario");
        delete this.user.$key;
        this.userProvider.createUser(this.user, success.uid );
        //this.userProvider.setCurrentUser(success.uid);
        this.CC.setFbUserOnCreation(false);
      },((error)=>{
        alert(error.message);
      }));

    }else{
      alert("auth fb");
      let key = this.user.$key;
      delete this.user.$key;
      this.userProvider.createUser(this.user, key );
      this.userProvider.setCurrentUser(key);
      this.CC.setFbUserOnCreation(false);
      
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(this.token);
      firebase.auth().signInWithCredential(facebookCredential).then().catch(e=>alert("Error: "+e.message));

      
      //this.afAuth.auth.signInWithCustomToken();
    }




    


  }


}
