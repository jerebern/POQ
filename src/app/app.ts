import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NameDataTable, MatTabsModule, MatIconModule, MatProgressBarModule, NameDataView, MatButtonModule, MatFormFieldModule,MatInputModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers:[]
})
export class App implements OnInit {

  constructor(
    private donneesQuebecApiRequestService : DonneesQuebecApiRquest,
    private matDialog : MatDialog
  ){}
  protected readonly title = signal('prenomQuebec');
  readonly dialog = inject(MatDialog);
  openedNameDataTabs : NameData[] = []
  nomsHomme : NameData[] = []
  selectedTab = new FormControl(0)
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
            value:this.extractValue(row[key])
          })
        }
        i++
      }) 

    }
    }
removeTab(nameData: NameData) {
  this.openedNameDataTabs.splice(this.openedNameDataTabs.findIndex(
    (element) => element == nameData),1)
}

  extractValue(value : string){
    if(value == "< 5"){
      return 1
    }
    else 
      return Number(value)
  }
  findAlreadyOpenTab(nameData : NameData){
   return Boolean(this.openedNameDataTabs.find(
      (element)=> element == nameData));  
  }
  viewEvent(nameData : NameData){
    if(!this.findAlreadyOpenTab(nameData)){
      this.openedNameDataTabs.push(nameData)
    }
    this.selectedTab.setValue((this.openedNameDataTabs.findIndex(
    (element) => element == nameData)+1)

    )
  }
  async getNameH(){
    let value = await lastValueFrom(this.donneesQuebecApiRequestService.getPrenomH())
    this.extractData(this.nomsHomme,value)
  }
  openSearchDialog(){
    let a
    this.dialog.open(NameSearchDialog,{data:
      this.nomsHomme
  
  }
   )
  }
  
}
