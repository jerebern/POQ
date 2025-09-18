import { inject, Injectable } from '@angular/core';
import { NameData } from '../objects/name-data';
import { NgxIndexedDBService } from 'ngx-indexed-db';
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
  async saveNamesData(namesDatas : NameData[], resetDatabase : boolean){
   if(resetDatabase){
      await this.resetDatabase()
   }
    await lastValueFrom(this.dbService.bulkAdd(DatabaseName.NameData,namesDatas)) 
  }
  async getNamesDatas() : Promise<any> {
    return await lastValueFrom(this.dbService.getAll("NameData"))
  }
}
