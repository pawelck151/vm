import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { DefaultValueAccessor } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import json from '../assets/data/settings.json';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { environment } from 'src/environments/environment.prod.js';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

export interface Users {
  value: any;
  viewValue: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vm-app';
  appTitle = 'Virtual Machine Manager';
  version = 'V01.00.38';
  jsonPath = '../assets/data/settings.json';
  jsonName = 'settings.json';
  isChecked : boolean = false;
  app:firebase.app.App = firebase.initializeApp(
    {
      apiKey: "AIzaSyCAq9MvI4s-cfRPRDpDuItn_AKxtAv40Pw",
      authDomain: "vmmanager-fabbf.firebaseapp.com",
      databaseURL: "https://vmmanager-fabbf.firebaseio.com",
      projectId: "vmmanager-fabbf",
      storageBucket: "vmmanager-fabbf.appspot.com",
      messagingSenderId: "882512572300"
    }
  );
  myRef = ()=> {
    return this.app.database().ref('userArray')}

  selectedUserW105030 = {value: 0, viewValue: 'Free'};
  selectedUserW105031 = {value: 0, viewValue: 'Free'};
  selectedUserW105032 = {value: 0, viewValue: 'Free'};
  selectedUserW78000 = {value: 0, viewValue: 'Free'};
  selectedUserW78001 = {value: 0, viewValue: 'Free'};
  selectedUserW78002 = {value: 0, viewValue: 'Free'};

  userArray = [this.selectedUserW105030, this.selectedUserW105031, this.selectedUserW105032, this.selectedUserW78000, this.selectedUserW78001, this.selectedUserW78002];

  users : Users[] = [
    {value: 0, viewValue: 'Free'},
    {value: 1, viewValue: 'Pawel'},
    {value: 2, viewValue: 'Joanna'},
    {value: 3, viewValue: 'Galyna'},
    {value: 4, viewValue: 'Grzegorz'},
    {value: 5, viewValue: 'Raman'},
    {value: 6, viewValue: 'Michal'},
    {value: 7, viewValue: 'Krystian'},
    {value: 8, viewValue: 'Blocked'}
  ]
   constructor (private httpClient : HttpClient){}
   ngOnInit(): void {
    let result,
        counter = 0;
    this.myRef().once('value').then(
      (data) => {
                  result = data.val();
                  for (let key in result) {
                                            this.userArray[counter] = this.users[result[key]]
                                            counter++;
                                          }
    });
   }
   selected(){
    let mockup = json,
        counter = 0;
    for (let key in json) {
      json[key] = this.userArray[counter].value;
      counter++;
    }
    this.myRef().update(mockup);
  }

  idCbArray = ['cb5030', 'cb5031', 'cb5032', 'cb8000', 'cb8001', 'cb8002'];

}
