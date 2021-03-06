import { ChatViewPage } from '../chat-view-page/chat-view-page';
import { ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user-provider';
import { ChatsProvider } from '../../providers/chats-provider';
import { CentralController } from '../../controllers/central.controller';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html'
})
export class ChatsPage {

  chats: any;

  constructor(
    public chatsProvider: ChatsProvider, 
    public userService: UserProvider, 
    public af:AngularFireDatabase, 
    public nav: NavController,
    public modalCtrl: ModalController,
    public CC: CentralController 
    ) {
      this.CC.presentToast("Cargando chats",500);


      this.chatsProvider.getChatsObservable().subscribe((chats) => {
          this.chats = chats;
          console.log("CHATS: ",this.chats);
          
          // this.CC.dismissLoading();
      });
    }

  openChat(driver){
    this.chatsProvider.openChat(driver);
    let modal = this.modalCtrl.create(ChatViewPage, {
      destinatario : driver
    });
    modal.present();
  }
  removeChat(chat){
    console.log(chat);
    this.chatsProvider.deleteChat(chat);
    //alert("Chat eliminado");
    this.CC.presentToast("Chat eliminado",0);
  }

}
