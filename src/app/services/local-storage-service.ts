import { Injectable } from '@angular/core';
import { NameData } from '../objects/name-data';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  validateWebDataBase() : boolean{
    let storeValue = this.getLastWebDataBaseUpdate()
    let lastUpdate : Date
    if(storeValue != null){
      lastUpdate = new Date(storeValue)
      if(new Date().getDate() < lastUpdate.getDate() + 7){
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

  getLastUpdateDate(){
    let updateDate = new Date(localStorage.getItem("lastUpdate")?.toString() ?? "")
    console.log(updateDate)
    return updateDate.getDate() + "/" + (updateDate.getMonth()+1) + "/" + updateDate.getFullYear()
  }

  setLastWebdataBaseUpdate(){
    localStorage.setItem("lastUpdate",new Date().toDateString())
  }

  clearLocalStorage(){
    localStorage.clear()
  }
}
