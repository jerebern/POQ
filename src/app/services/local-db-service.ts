import { inject, Injectable } from '@angular/core';
import { NameData } from '../objects/name-data';
import { AppDb } from './app-db';
import { lastValueFrom } from 'rxjs';
import { SearchParams } from '../../enum/search-params';
import { Collection } from 'dexie';

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

  async searchNameDatas(searchParams: SearchParams): Promise<NameData[]> {
    console.log(searchParams);
    let limit = 1000;
    if (searchParams.SearchName && searchParams.NameType) {
      return this.dbService.namesDatas
        .where('name')
        .startsWithIgnoreCase(searchParams.SearchName)
        .filter((nameData) => nameData.nameType == searchParams.NameType)
        .limit(limit)
        .toArray();
    } else if (searchParams.SearchName) {
      return this.dbService.namesDatas
        .where('name')
        .startsWithIgnoreCase(searchParams.SearchName)
        .limit(limit)
        .toArray();
    } else if (searchParams.NameType) {
      return this.dbService.namesDatas.where('nameType').equals(searchParams.NameType).toArray();
    }
    return this.getNamesDatas();
  }
  async getNamesDatas(): Promise<NameData[]> {
    return this.dbService.namesDatas.toArray();
  }
}
