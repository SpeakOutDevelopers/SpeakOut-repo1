import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login-page/login-page';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { RegisterLanguagePage } from '../pages/register-language/register-language';
import { UserProvider } from '../providers/user-provider';
import { CentralController } from '../controllers/central.controller';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroPage;
  userKey: string;

  constructor(
    platform: Platform,
    public auth: AngularFireAuth, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public userProvider: UserProvider,
    public CC: CentralController,
    ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      // this.userProvider.getUserExistsSubject().subscribe((userExists)=>{
      //   alert("user exists "+userExists);
      //   if(userExists){
      //     this.rootPage = TabsPage;
      //     this.userProvider.setCurrentUser(this.userKey);
      //   } else {
      //     this.CC.dismissLoading();
      //     this.rootPage = IntroPage;
      //   }
      // });

      const authObserver = auth.authState.subscribe( user => {
        alert("app.comp auth state: "+JSON.stringify(user));
        this.CC.presentLoading("Auntenticando");
        
        if(user){
          // this.userKey = user.uid;
          this.userProvider.queryUserExists(user.uid);

          setTimeout(() => {   }, 4000);

          if(this.userProvider.getUserExistsSubject()){
            this.rootPage = TabsPage;
            this.userProvider.setCurrentUser(this.userKey);
          }else{
            this.CC.dismissLoading();
            this.rootPage = IntroPage;
          }

          


        }else{
          this.CC.dismissLoading();
        }
      });

    });
  }
}
