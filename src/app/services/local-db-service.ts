import { inject, Injectable } from '@angular/core';
import { NameData } from '../objects/name-data';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Year } from '../objects/year';
import { lastValueFrom } from 'rxjs';
import { DatabaseName } from '../objects/databasesName';

@Injectable({
  providedIn: 'root'
})
export class LocalDbService {
  constructor(){}
  dbService = inject(NgxIndexedDBService);

  async resetDatabase(){
    return await lastValueFrom(this.dbService.clear(DatabaseName.NameData))
  }
  async saveNamesData(namesDatas : NameData[]){
   await this.resetDatabase()
   await lastValueFrom(this.dbService.bulkAdd(DatabaseName.NameData,namesDatas)) 

  }
  //anyYears c'est vraiment terrible comme nom de variable.
  async getNamesDatas() : Promise<any> {
    return await lastValueFrom(this.dbService.getAll("NameData"))
  }
}
