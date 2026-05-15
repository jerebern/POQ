import { inject, Injectable } from '@angular/core';
import { NameData } from '../objects/name-data';
import { AppDb } from './app-db';

@Injectable({
  providedIn: 'root'
})
export class LocalDbService {
  constructor(){}
  dbService = inject(AppDb);

async saveNamesData(
  namesDatas: NameData[],
  resetDatabase: boolean
) {

  if (resetDatabase) {

    await this.dbService.namesDatas.clear();
  }

  await this.dbService.namesDatas.bulkAdd(namesDatas);
}
  async getNamesDatas() : Promise<any> {
    return await this.dbService.namesDatas.toArray();
  }

}
