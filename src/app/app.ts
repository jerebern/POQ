import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonneesQuebecApiRquest } from './services/donnees-quebec-api-rquest';
import { lastValueFrom } from 'rxjs';
import { NameData } from './objects/name-data';
import { NameDataTable } from './name-data-table/name-data-table';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NameDataTable,MatTab,MatTabGroup,MatIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers:[]
})
export class App implements OnInit {
  constructor(
    private donneesQuebecApiRequestService : DonneesQuebecApiRquest
  ){}
  protected readonly title = signal('prenomQuebec');
  nomsHomme : NameData[] = []
  async ngOnInit() {
    this.getNameH()
  }

  extractData(data : NameData[],quebecData :any){
    //Couche 1
    for(let row of quebecData.result.records){
      data.push({
        years:[],
        name:row["Prenom/Annee"],
        id:row["_id"]
      })
      Object.keys(row).forEach(key=>{
        if(key.length == 4){
          data[length].years.push({
            digits:key,
            value:row[key]
          })

        }
    }) 
    }
    }
  
 


  async getNameH(){
    let value = await lastValueFrom(this.donneesQuebecApiRequestService.getPrenomH())
    this.extractData(this.nomsHomme,value)
  }

  
}
