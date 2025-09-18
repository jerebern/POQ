import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIndexedDb, DBConfig } from 'ngx-indexed-db';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DatabaseName } from './objects/databasesName';

const dbConfig: DBConfig  = {
  name: 'DonneeQuebecNameRecords',
  version: 1,
  objectStoresMeta: [{
    store: DatabaseName.NameData,
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false }},
      { name: 'years', keypath: 'years', options: { unique: false }},
      { name: 'nameType', keypath: 'nameType', options: { unique: false }},
      { name: 'totalUse', keypath: 'totalUse', options: { unique: false }},
    ]
  },
]
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideIndexedDb(dbConfig)
  ]
};
