import { inject, Injectable } from '@angular/core';
import { NameData } from '../objects/name-data';
import { AppDb } from './app-db';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalDbService {
  constructor() {}
  dbService = inject(AppDb);

  async saveNamesData(namesDatas: NameData[], resetDatabase: boolean) {
    if (resetDatabase) {
      await this.dbService.namesDatas.clear();
    }

    await this.dbService.namesDatas.bulkAdd(namesDatas);
  }

  async searchNameDatas(searchValue: string) {
    return await this.dbService.namesDatas
      //filtre
      .where('name')
      .startsWithAnyOfIgnoreCase(searchValue.toLocaleUpperCase())
      .toArray();
  }
  async getNamesDatas(): Promise<any> {
    return await this.dbService.namesDatas.toArray();
  }
}
