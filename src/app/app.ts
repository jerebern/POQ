import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonneesQuebecApiRquest } from './services/donnees-quebec-api-rquest';
import { lastValueFrom } from 'rxjs';
import { NameData } from './objects/name-data';
import { NameDataTable } from './name-data-table/name-data-table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NameDataView } from "./name-data-view/name-data-view";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NameDataTable, MatTabsModule, MatIconModule, MatProgressBarModule, NameDataView],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers:[]
})
export class App implements OnInit {
  constructor(
    private donneesQuebecApiRequestService : DonneesQuebecApiRquest
  ){}
  protected readonly title = signal('prenomQuebec');
  openedNameDataTabs : NameData[] = []
  nomsHomme : NameData[] = []
  async ngOnInit() {
    this.getNameH()
  }

  extractData(data : NameData[],quebecData :any){
    for(let row of quebecData.result.records){
      let i = 0
      data.push({
        years:[],
        name:row["Prenom/Annee"],
        id:row["_id"]
      })
      Object.keys(row).forEach(key=>{
        if(key.length == 4){
          data[data.length-1].years.push({
            digits:key,
            value:row[key]
          })
        }
        i++
      }) 

    }
    }
  findAlreadyOpenTab(nameData : NameData){
   return Boolean(this.openedNameDataTabs.find(
      (element)=> element == nameData));  
  }
  viewEvent(nameData : NameData){
    if(!this.findAlreadyOpenTab(nameData)){
      this.openedNameDataTabs.push(nameData)
    }
  }
  async getNameH(){
    let value = await lastValueFrom(this.donneesQuebecApiRequestService.getPrenomH())
    this.extractData(this.nomsHomme,value)
  }

  
}
