import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilService} from "../../app/app.util.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

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
  public username :any;
  public password :any;
  loginForm : FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public  utilService : UtilService,private formBuilder:FormBuilder) {
    this.loginForm = formBuilder.group({
      username: ['',Validators.compose([Validators.minLength(11),Validators.maxLength(11),Validators.required,Validators.pattern("^1[0-9]\d+")])],
      password: ['',Validators.compose([Validators.minLength(6),Validators.required])],

    })
    this.username = this.loginForm.controls["username"];
    this.password = this.loginForm.controls["password"];
  }

  ngOnInit(){
    //检测有没有记住密码
    let code = localStorage.getItem('account');
    if(code){
      try {
        var usernameAndPassword = this.utilService.encodeString(code);
        var pair = usernameAndPassword.split(',');

      }catch(e){

      }
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  logIn(){
    console.log(this.username)
  }
  verifyAccount(){

  }
}
