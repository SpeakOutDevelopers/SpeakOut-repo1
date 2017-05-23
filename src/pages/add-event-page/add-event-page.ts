import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Evento, Idioma } from '../../commons/entities';
import { EventProvider } from '../../providers/event-provider';
import { UserProvider } from '../../providers/user-provider';
import { CentralController } from '../../controllers/central.controller';

/**
 * Generated class for the AddEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-event-page',
  templateUrl: 'add-event-page.html',
})
export class AddEventPage {

  evento: Evento = {
    fecha_creacion: "",
    fecha_evento: '',
    hora_fin: '',
    hora_inicio: '',
    idiomas:  [],
    ubicacion: '',
    usuario: { biografia: '', idiomas : [], img : '', key : '', nombre: ''}
  }

  contadorCarga = 0;

  todosIdiomas = [];
  idiomaSelecionadoImg: any;

  idiomaSeleccionado: any;
  languages = [];

  ubicacion:any;
  ubicaciones:any;

  user: any;

  currentDate = new Date().toISOString().slice(0, 10);

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl:ViewController,
    public alertCtrl:AlertController,
    public eventProvider: EventProvider,
    public CC: CentralController,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController,


    ) {
      this.init();
       
      this.eventProvider.getIdiomasObservable().subscribe((idiomas) => {
        this.todosIdiomas = idiomas;
        
        console.log(this.todosIdiomas);
      });
      this.eventProvider.getUbicacionesObservable().subscribe((ubicaciones) => {
        this.ubicaciones = ubicaciones;
      });
  }


  init() {

    if(this.userProvider.isUserSet()){
      this.userProvider.getCurrentUserObservable().subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
    }else{
      this.presentLoadingDefault();
    }
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
  save(formData): void {

     if(formData.valid){

        if(this.languages.length < 1){
          this.CC.showAlert("La lista de idiomas esta vacía");
          return null;
        }
        if(this.ubicacion == '' || this.ubicacion == null){
          this.CC.showAlert("No se ha escogido una ubicacion");
          return null;
        }
        this.evento = {
          fecha_creacion: new Date(),
          fecha_evento: formData.value.date_event,
          hora_fin: formData.value.end_time,
          hora_inicio: formData.value.start_time,
          idiomas: this.languages,
          ubicacion: this.getUbicacion(),
          usuario:this.user
        };

        this.viewCtrl.dismiss(this.evento);
     }
  }
  close(): void {
    this.viewCtrl.dismiss();
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

  presentLoadingDefault() {
    let listaCargaTxt = [' idiomas...',' ubicaciones..', ' informacion...', 'usuario...', '...'];
    let loading = this.loadingCtrl.create({
      content: 'Cargando'+listaCargaTxt[this.contadorCarga]
    });

    loading.present();

    setTimeout(() => {
      //lo que pasa cuando se cumple el timeout
      loading.dismiss();
      this.contadorCarga++;
      this.init();
    }, 3000/*tiempo de duracion del timeout*/);
  }
  getUbicacion(){
    let index = this.ubicaciones.findIndex(x => x.nombre === this.ubicacion);    
    return this.ubicaciones[index];
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
