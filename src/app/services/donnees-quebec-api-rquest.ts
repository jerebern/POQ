import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { donneeQuebecRessourceStore } from '../objects/donneeQuebecRessourceStore';
import { lastValueFrom } from 'rxjs';
import { LocalDbService } from './local-db-service';
import { NameData } from '../objects/name-data';
import { NameType } from '../objects/nameType';

@Injectable({
  providedIn: 'root'
})

export class DonneesQuebecApiRquest {
  baseURL = "https://www.donneesquebec.ca/recherche/api/3/action/datastore_search"
  constructor(
    private http : HttpClient,
    private localDbService : LocalDbService
  ) {}

  getHttpParams(offset : number,ressourdId : string){
    let httpParams = new HttpParams()
    httpParams = httpParams.set("resource_id",ressourdId)
    httpParams = httpParams.set("offset",offset)
    httpParams = httpParams.set("limit",10000)
    httpParams = httpParams.set("records_format","objects")
    return httpParams
  }

  getPrenomsF(){
    return <any>this.http.get(this.baseURL,{
      params:this.getHttpParams(5000,donneeQuebecRessourceStore.prenomFemme)
    })

  }

  getPrenomsH(offset : number){
    return <any>this.http.get(this.baseURL,{
      params:this.getHttpParams(offset,donneeQuebecRessourceStore.prenomHomme)
    })

  }

  extractValue(value : string){
      if(value == "< 5"){
        return 1
      }
      else 
        return Number(value)
  }

  extractData(quebecData :any, nameType : NameType){
    let data : NameData[] = []
      for(let row of quebecData.result.records){
        let i = 0
        data.push({
          years:[],
          name:row["Prenom/Annee"],
          nameType :  nameType
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
      return data
      }

  async refreshData(){
    let firstRun : boolean = true
    let limits = 10000
    for(let offset = 0; offset<limits ; offset+=10000){
      let records  : any = await lastValueFrom(this.getPrenomsH(offset)) 
      limits = records.result.total
      await this.localDbService.saveNamesData(this.extractData(records,NameType.HOMME),firstRun)
      firstRun = false
    }
  }
}
