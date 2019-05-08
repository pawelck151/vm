import { Component, NgModule, OnInit } from '@angular/core';
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
// import * as $ from 'jquery';
import { TestService } from 'src/app/services/test.services';
import { Observable } from 'rxjs';

export interface Users {
  value: any;
  viewValue: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'vm-app';
  appTitle = 'Virtual Machine Manager';
  version = 'V01.00.38';
  jsonPath = '../assets/data/settings.json';
  jsonName = 'settings.json';
  isChecked : boolean = false;
  testMessage$: Observable<string>;
  constructor(private testService: TestService) { }

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
   ngOnInit() : void {
    // this.getTestMessage();
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
      // this.getTestMessage () {
      // this.testService.getTestMessage().subscribe(data => console.log(data));
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
  checkMachineState(){
    let url = "http://localhost:5000/api/values";
    fetch(url)
      .then(response => console.log(response.text()))
      .catch((error)=>console.log(error));

    //  $.get("https://localhost:5001/api/values", (data)=>{
    //   console.log(data)
    //  let mockup ,
    //       counter = 0;
    //   for (let key in json) {
    //       json[key] = this.userArray[counter].value;
    //       counter++;
    //   }
    //   this.myRef().update(mockup);
  // } )
}
}
