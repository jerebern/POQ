import { Injectable } from '@angular/core';
import { LocalStorageName } from '../objects/localStorageName';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  validateWebDataBase() : boolean{
    return Boolean(this.getLastWebDataBaseUpdate())
  }

  setDisclamer(){
    localStorage.setItem(LocalStorageName.DISCLAMER ,new Date().toDateString())
  }

  getDisclamer(){
    return localStorage.getItem(LocalStorageName.DISCLAMER)
  }

  getLastWebDataBaseUpdate(){
    return localStorage.getItem(LocalStorageName.LASTUPDATE)
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
