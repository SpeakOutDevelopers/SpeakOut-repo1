import { CentralController } from '../controllers/central.controller';
import { Observable, Subject } from 'rxjs/Rx';
// import { UserProvider } from './user-provider';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';



@Injectable()
export class ChatsProvider {

      //GLOBAL
    user: any;

    
    //CHATS 
    chatsObservable: FirebaseListObservable<any>;
    chatsStatic: any;
    openedChatRecipientKey: any;

    recentEndpoint1: FirebaseObjectObservable<any>;
    recentEndpoint2: FirebaseObjectObservable<any>;

    allMessages: FirebaseListObservable<any>;

    //CHAT VIEW
    currentChatRef1: FirebaseListObservable<any>;
    currentChatRef2: FirebaseListObservable<any>;

    chatsSubject: Subject<any>;


    constructor(
        public database: AngularFireDatabase, 
        // public userProvider: UserProvider,
        public CC: CentralController
        ){
        
        this.chatsSubject = new Subject();
        this.allMessages = this.database.list('/mensajes');
        // this.userProvider.getCurrentUserSubject().subscribe((user)=>{
           
           
        //     // this.CC.dismissLoading();
        // });
    }
    init(user){
        this.user = user;
        this.chatsObservable = this.database.list(`/usuarios/${this.user.$key}/chats`);
    }

    createChat(destinatario: any){
        console.log("DESTINATARIO: ",destinatario);

        if(this.user.$key == destinatario.key){
<<<<<<< HEAD
            //alert("No se puede chat consigo mismo");
=======
            this.CC.presentToast("No se puede chatear consigo mismo",1000);
>>>>>>> fblogin
            return false;
        }
        this.recentEndpoint1 = this.database.object(`/usuarios/${this.user.$key}/chats/${destinatario.key}`);
        this.recentEndpoint1.update({
            destinatario: {
                nombre: destinatario.nombre,
                key: destinatario.key,
                img : destinatario.img
            }
        });

      
        this.recentEndpoint2 = this.database.object(`/usuarios/${destinatario.key}/chats/${this.user.$key}`);
        this.recentEndpoint2.update({
            destinatario: {
                nombre: this.user.nombre,
                key: this.user.$key,
                img : this.user.img

            }
        });
        
        return true;
    }
    
    getChatsSubject(): Subject<any>{
        return this.chatsSubject;
    }
    getChatsObservable():FirebaseListObservable<any>{
        return this.chatsObservable;
    }
    getChatRefObservable(ref: number): FirebaseListObservable<any>{
        if(ref==1){
            return this.currentChatRef1;
        }else{
            return this.currentChatRef2;
        }
    }

    openChat(destinatario){
        console.log("ABRIR CHAT DESTINATORIO:",destinatario);

        this.currentChatRef1 = this.database.list(`/mensajes/${this.user.$key},${destinatario.key}`);
        this.currentChatRef2 = this.database.list(`/mensajes/${destinatario.key},${this.user.$key}`);

        this.recentEndpoint1 = this.database.object(`/usuarios/${this.user.$key}/chats/${destinatario.key}`);
        this.recentEndpoint2 = this.database.object(`/usuarios/${destinatario.key}/chats/${this.user.$key}`);

    }
    deleteChat(chat){
        if(this.allMessages==null){
            this.CC.presentToast("Error: mensajes nulos",0);
            return null;
        }
        try {
            this.allMessages.remove(this.user.$key+","+chat.destinatario.key);
            this.allMessages.remove(chat.destinatario.key+","+this.user.$key);

            this.recentEndpoint1 = this.database.object(`/usuarios/${this.user.$key}/chats/${chat.destinatario.key}`);
            this.recentEndpoint2 = this.database.object(`/usuarios/${chat.destinatario.key}/chats/${this.user.$key}`);

            this.recentEndpoint1.remove();
            this.recentEndpoint2.remove();
        } catch (error) {
            console.log(error);
        }
        
    }

    pushChatMessage(message: any){
        console.log(message);
        this.currentChatRef1.push(message);
        this.currentChatRef2.push(message);

        this.recentEndpoint1.update({
            ultimo_mensaje: this.user.nombre+": "+message.message,
        });

        this.recentEndpoint2.update({
            ultimo_mensaje: this.user.nombre+": "+message.message,
        })
    }
}
