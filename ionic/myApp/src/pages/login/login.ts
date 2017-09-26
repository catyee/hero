import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  public username = '';
  public password = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    //检测有没有记住密码
    let code = localStorage.getItem('account');
    if(code){

    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  logIn(){
    console.log('logIn')
  }
  verifyAccount(){

  }
}
