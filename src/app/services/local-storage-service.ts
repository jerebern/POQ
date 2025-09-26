import { Injectable } from '@angular/core';
import { NameData } from '../objects/name-data';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  validateWebDataBase() : boolean{
    let storeValue =this.getLastWebDataBaseUpdate()
    let lastUpdate : Date
    if(storeValue != null){
      lastUpdate = new Date(storeValue)
      if(new Date().getDay() < lastUpdate.getDay() + 7){
        return true
      }
    }
    return false
  }
  setDisclamer(){
    localStorage.setItem("disclamer",new Date().toDateString())
  }
  getDisclamer(){
    return localStorage.getItem("disclamer")
  }

  getLastWebDataBaseUpdate(){
    return localStorage.getItem("lastUpdate")
  }
  setLastWebdataBaseUpdate(){
    localStorage.setItem("lastUpdate",new Date().toDateString())
  }
  clearLocalStorage(){
    localStorage.clear()
  }
}
