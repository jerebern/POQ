import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DonneesQuebecApiRquest {
  baseURL = "https://www.donneesquebec.ca/recherche/api/3/action/datastore_search"
  constructor(
    private http : HttpClient
  ) {}  


  getPrenomH(){
    let httpParams = new HttpParams()
    httpParams = httpParams.set("resource_id","039539f5-af55-4d8f-9010-ca718e45c2a5")
    httpParams = httpParams.set("limit",5000)
    httpParams = httpParams.set("records_format","objects")
    return <any>this.http.get(this.baseURL,{params:httpParams})
  }
}
