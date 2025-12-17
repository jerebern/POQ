import { Injectable } from '@angular/core';
import { LocalStorageName } from '../objects/localStorageName';


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
    localStorage.setItem(LocalStorageName.DISCLAMER ,new Date().toDateString())
  }

  getDisclamer(){
    return localStorage.getItem(LocalStorageName.DISCLAMER)
  }

  getLastWebDataBaseUpdate(){
    return localStorage.getItem(LocalStorageName.DISCLAMER)
  }

  getLastUpdateDate(){
    let updateDate = new Date(localStorage.getItem(LocalStorageName.LASTUPDATE)?.toString() ?? "")
    return updateDate.getDate() + "-" + (updateDate.getMonth()+1) + "-" + updateDate.getFullYear()
  }

  setLastWebdataBaseUpdate(){
    localStorage.setItem(LocalStorageName.LASTUPDATE,new Date().toDateString())
  }

  clearLocalStorage(){
    localStorage.clear()
  }
}
