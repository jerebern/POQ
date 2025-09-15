import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIndexedDb, DBConfig } from 'ngx-indexed-db';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

const dbConfig: DBConfig  = {
  name: 'DonneeQuebecNameRecords',
  version: 1,
  objectStoresMeta: [{
    store: 'NameData',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  },
  {
    store: 'Year',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'nameDataId', keypath: 'nameDataId', options: { unique: false } },
      { name: 'value', keypath: 'value', options: { unique: false } },
      { name: 'digits', keypath: 'digits', options: { unique: false } }
      
    ]
  }
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
