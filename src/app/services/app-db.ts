import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { NameData } from '../objects/name-data';

@Injectable({
  providedIn: 'root',
})
export class AppDb extends Dexie {
    namesDatas!: Table<NameData, number>;

  constructor() {

    super('DonneeQuebecNameRecords');

    this.version(1).stores({
      namesDatas: '++id, name, nameType, totalUse, years'
    });
  }

}
export const db = new AppDb();
