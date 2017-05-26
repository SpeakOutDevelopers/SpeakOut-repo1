import { CentralController } from '../../controllers/central.controller';
import { ChatsProvider } from '../../providers/chats-provider';
import { ChatViewPage } from '../chat-view-page/chat-view-page';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddEventPage } from '../add-event-page/add-event-page';
import { EventProvider } from '../../providers/event-provider';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myDate: String = new Date().toISOString();

  testCheckboxOpen: boolean = true;
  testCheckboxResult: String = "";

  eventos: any;

  eventosFiltrados: any;

  eventosEstaticos: any;

  parameterUbicacion:any;
  parameterFecha:any;
  parameterIdioma=[];

  testRadioOpen:any;
  testRadioResult:any;

  ubicaciones:any;

  idiomas:any;

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
     public eventProvider: EventProvider, 
     public actionSheetCtrl: ActionSheetController,
     public alertCtrl: AlertController,
     public chatsProvider: ChatsProvider,
     public CC: CentralController
     ) {
    
    this.eventProvider.getIdiomasObservable().subscribe((idiomas)=>{ 
      this.idiomas=idiomas;
      console.log(idiomas)
    })

    this.eventProvider.getUbicacionesObservable().subscribe((ubicaciones)=>{ 
      this.ubicaciones=ubicaciones;
      console.log(ubicaciones)
    });

    this.eventProvider.getEventosObservable().subscribe((eventos) => {
      this.eventosEstaticos = eventos;
      this.eventos=this.eventosEstaticos;
      console.log(this.eventos);
    });

  }

filtrarPorubicacion (){

  this.eventosFiltrados=this.eventosEstaticos.filter((evento)=>{
    if(evento.ubicacion.nombre==this.parameterUbicacion){
      return evento;
    }
  });
  this.eventos=this.eventosFiltrados;
}

filtrarPorfecha (){

  this.eventosFiltrados=this.eventosEstaticos.filter((evento)=>{
    return (evento.hora_inicio<this.parameterFecha[0] && evento.hora_fin>this.parameterFecha[1] && evento.fecha_evento==this.parameterFecha[2]);
  });
  this.eventos=this.eventosFiltrados;
}
filtrarFecha(){
  console.log("filtrar fecha " + this.parameterFecha);

  let date = new Date(this.parameterFecha);

  // console.log(date.getDate());
  // console.log(date.getUTCHours());
  

  this.eventosFiltrados=this.eventosEstaticos.filter((evento)=>{
    console.log(evento.fecha_evento +"/"+evento.hora_inicio+"/"+evento.hora_fin);
    // let dateInicioEvento = new Date(evento.fecha_evento+"T"+evento.hora_inicio+":00Z");
    // let dateFinEvento = new Date(evento.fecha_evento+"T"+evento.hora_fin+":00Z");

    // console.log(dateInicioEvento);
    // console.log(dateFinEvento);
    
    
    return (evento.fecha_evento==this.parameterFecha.split('T')[0] &&
            (evento.hora_inicio.split(':')[0]>=date.getUTCHours() || evento.hora_fin.split(':')[0]>date.getUTCHours()))
  });
  this.eventos=this.eventosFiltrados;
}

filtrarPorIdioma (){

  let ret: any[]=[];
  this.eventosFiltrados=this.eventosEstaticos.filter((evento)=>{  

    evento.idiomas.forEach(element =>{
    if(this.parameterIdioma.indexOf(element.nombre)>-1){
      console.log(element)
      ret.push(evento);
    }
  });
 

  });

  this.eventos=ret;
console.log(this.eventos)
  }

  addEvent(){
    this.CC.presentToast("Cargando...",200);


    let modal = this.modalCtrl.create(AddEventPage);

    modal.onDidDismiss(event => {
      if(event){
        this.eventProvider.createEvent(event);
      }
    });

    modal.present();
  }
   openDateFilter() {


    var options = {
        date: new Date(),
        mode: 'date'
    };

  function onSuccess(date) {
      alert('Selected date: ' + date);
  }

  function onError(error) { // Android only
      alert('Error: ' + error);
  }

  // this.datePicker.show({
  //   date: new Date(),
  //   mode: 'date',
  //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  // }).then(
  //   date => console.log('Got date: ', date),
  //   err => console.log('Error occurred while getting date: ', err)
  // );

    }
    openLanguageFilter() {
    
    let alert = this.alertCtrl.create();
    alert.setTitle('MIS IDIOMAS');

    this.idiomas.forEach(element => {

      alert.addInput({
      type: 'checkbox',
      label: element.nombre,
      value: element.nombre,
      checked: false
      
    });

    });

    

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data)
        this.parameterIdioma=data
        console.log(this.parameterIdioma);
        this.filtrarPorIdioma();
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
       
      }
    });
    alert.present();
  
  }

  openUbicationFilter() {
  
    let alert = this.alertCtrl.create();
    alert.setTitle('Lugar Cercano');

    this.ubicaciones.forEach(element => {

      alert.addInput({
      type: 'radio',
      label: element.nombre,
      value: element.nombre,
      checked: false
      
    });

    });

    

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data)
        this.parameterUbicacion=data;
        this.filtrarPorubicacion();
        this.testRadioOpen = false;
        this.testRadioResult = data;
      
      }
    });
    alert.present();
  
    
  }

  cleanFilters(){
    this.eventos=this.eventosEstaticos;
  }

  openChat(usuario){
    let success = this.chatsProvider.createChat(usuario);
    if(success){
      // this.CC.presentLoading("Espera");
      this.chatsProvider.openChat(usuario);
      let modal = this.modalCtrl.create(ChatViewPage, {
        destinatario : usuario
      });
      modal.present();
    } 
  }



}
