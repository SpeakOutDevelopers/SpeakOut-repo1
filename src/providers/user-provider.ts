import { ChatsProvider } from './chats-provider';
import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable , } from 'angularfire2/database';
import { CentralController } from '../controllers/central.controller';


/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {

  currentUser: FirebaseObjectObservable<any>;
  user:any;
  userExistsSubject: Subject<any>;
  currentUserSubject: Subject<any>;
  userExists:boolean = false;

  constructor(
    public database: AngularFireDatabase,
    public CC: CentralController,
    public chatsProvider:ChatsProvider
    ) {
      console.log('Hello UserProvider Provider');
      this.userExistsSubject = new Subject();
      this.currentUserSubject = new Subject();
  }

    setCurrentUser(key){
      this.currentUser = this.database.object('/usuarios/'+key);
      this.currentUser.subscribe((user) => {
        this.user = user;
        console.log("user-provider current user: ",user);
        this.chatsProvider.init(user);
        this.currentUserSubject.next(user);
        //this.CC.dismissLoading();
      });

	}
  queryUserExists(key:string){
    this.database.object('/usuarios/'+key, { preserveSnapshot: true }).subscribe((user) => {
      //alert("provider usuario existe: "+JSON.stringify(user));
      console.log("exists",user.exists());
      
      if(!user.exists()){

        this.CC.presentToast("El usuario no esta creado completamente",1000);
        this.userExistsSubject.next(false);
      }else{
        this.userExistsSubject.next(true);
      }
    });
  }

  getCurrentUserObservable(){
    return this.currentUser;
  }
  isUserSet(): boolean{
      if(this.currentUser == null){
        return false;
      }else{
        return true;
      }
  }
  createUser(user,key){
		let newUser = this.database.object(`/usuarios/${key}`);
		newUser.update(user);
	}

  checkUserExists(key:string):boolean{
    return 
  }

  getUserExistsSubject():Subject<any>{
    return this.userExistsSubject;
  }
  updateCurrentUser(newUserData:any){
    this.currentUser.update(newUserData);
  }
  getCurrentUserSubject(): Subject<any>{
    return this.currentUserSubject;
  }

}
