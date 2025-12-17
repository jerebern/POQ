import { Injectable } from '@angular/core';
import { NameData } from '../objects/name-data';
import { last } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  validateWebDataBase() : boolean{
    let lastUpdate : string|null = this.getLastWebDataBaseUpdate()
    let futurDate = new Date()
    futurDate.setDate(futurDate.getDate() + 7)
    if(lastUpdate != null && (futurDate.getTime() < new Date(lastUpdate).getTime())){     
      return false
    }
    return true
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
    return updateDate.getDate() + "/" + (updateDate.getMonth()+1) + "/" + updateDate.getFullYear()
  }

  setLastWebdataBaseUpdate(){
    localStorage.setItem("lastUpdate",new Date().toDateString())
  }

  clearLocalStorage(){
    localStorage.clear()
  }
}
