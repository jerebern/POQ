import { inject, Injectable } from '@angular/core';
import { NameData } from '../objects/name-data';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Year } from '../objects/year';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalDbService {
  constructor(){}
  dbService = inject(NgxIndexedDBService);
  async saveNamesData(namesDatas : NameData[]){
    for(let nameData of namesDatas){
      let lastrow = await lastValueFrom(this.dbService.add("NameData",
        {
          name :nameData.name
        }
      )

    )

      this.saveYears(nameData.years,lastrow.id)
    }
  }
 async saveYears(years : Year[] , nameDataId : number){
  for(let year of years){
    
      await lastValueFrom(this.dbService.add("Year",
          {
            digits : year.digits, value : year.value, nameDataId: nameDataId
          }
        ))
    }   
  }
  //anyYears c'est vraiment terrible comme nom de variable.
  getYearsByNameDataId(anyYears : any[],nameDataId : number){
    let years : Year[] = []
    for(let ayear of anyYears){
      if(ayear.nameDataId == nameDataId){
        years.push(
          {
            digits : ayear.digits,
            value : ayear.value
          }
        )
      }
     }
     return years
  }

  async getNamesDatas(){
  let nameData : NameData[] = []
  let anyYears : any[] = await this.getYears()
  let datas : any[]= await lastValueFrom(this.dbService.getAll("NameData"))
  for(let data of datas ){
    nameData.push(
     {
      name:data.name,
      id: data.id,
      years:this.getYearsByNameDataId(anyYears,data.id)
     }  
    )
  }
  return nameData
}


async getYears() {
  let yearsData : any[] =  await lastValueFrom(this.dbService.getAll("Year"))
  return yearsData
}
}
