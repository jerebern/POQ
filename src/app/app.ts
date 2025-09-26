import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DonneesQuebecApiRquest } from './services/donnees-quebec-api-rquest';
import { lastValueFrom } from 'rxjs';
import { NameData } from './objects/name-data';
import { NameDataTable } from './name-data-table/name-data-table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NameDataView } from "./name-data-view/name-data-view";
import { MatButtonModule } from "@angular/material/button";
import { FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';import {
  MatDialog,
} from '@angular/material/dialog';
import { NameSearchDialog } from './name-search-dialog/name-search-dialog';
import { LocalDbService } from './services/local-db-service';
import { LocalStorageService } from './services/local-storage-service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { donneeQuebecRessourceStore } from './objects/donneeQuebecRessourceStore';
import { DisclamerDialog } from './disclamer-dialog/disclamer-dialog';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NameDataTable, MatTabsModule, MatIconModule, MatProgressBarModule, NameDataView, MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers:[]
})
export class App implements OnInit {
  constructor(
    private donneesQuebecApiRequestService : DonneesQuebecApiRquest,
    private localDbService : LocalDbService,
    private localStorageService : LocalStorageService,
  ){}
  protected readonly title = signal('Prénom Québec');
  readonly dialog = inject(MatDialog);
  openedNameDataTabs : NameData[] = []
  nameData : NameData[] = []
  selectedTab = new FormControl(0)
  dataSourceStr : string =""
  ngOnInit() {
    if(this.disclamerValue ==null){
    this.openDisclamer()
    }
    this.validateCache()
  }


  validateCache(){
    if(this.localStorageService.validateWebDataBase()){
      this.getNameDataFromLocal()
    }
    else{
      this.getNameDataFromDonneeQuebecApi()
    }
  }
  get disclamerValue(){
    return this.localStorageService.getDisclamer()
  }
  async openDisclamer(){
    let dialog = this.dialog.open(DisclamerDialog, {disableClose:true})
    if(await lastValueFrom(dialog.afterClosed())){
      this.localStorageService.setDisclamer()
    }
    else{
      window.location.href = "http://www.google.ca"
    }
  }

  
removeTab(nameData: NameData) {
  this.openedNameDataTabs.splice(this.openedNameDataTabs.findIndex(
    (element) => element == nameData),1)
}


  findAlreadyOpenTab(nameData : NameData){
   return Boolean(this.openedNameDataTabs.find(
      (element)=> element == nameData));  
  }
  openNewTab(nameData ?: NameData){
   if(nameData){
    if( !this.findAlreadyOpenTab(nameData)){
      this.openedNameDataTabs.push(nameData)
    }
    this.selectedTab.setValue((this.openedNameDataTabs.findIndex(
    (element) => element == nameData)+1)

    )
   }

  }
  refreshClick() {
    this.getNameDataFromDonneeQuebecApi()
  }
  async getNameDataFromDonneeQuebecApi(){
    this.nameData =[]
    this.dataSourceStr = "Récupérations des données à https://www.donneesquebec.ca/"
    await this.donneesQuebecApiRequestService.refreshData(donneeQuebecRessourceStore.prenomHomme,true)
    await this.donneesQuebecApiRequestService.refreshData(donneeQuebecRessourceStore.prenomFemme,false )
    this.localStorageService.setLastWebdataBaseUpdate()
      try{
        await this.getNameDataFromLocal() 
      } 
      catch{
        console.error("Erreur Avec la Base de données")
        this.localStorageService.clearLocalStorage()
      }
  }
  async getNameDataFromLocal(){
    this.dataSourceStr = "Récupérations des données en local"
    this.nameData = await this.localDbService.getNamesDatas()
  }
 async  openSearchDialog(){
   let dialog = this.dialog.open(NameSearchDialog,{data:
      this.nameData,
      width : "30%"
    }
   )
  this.openNewTab(await lastValueFrom(dialog.afterClosed()))
  }
  
}
