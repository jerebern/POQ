import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NameData } from '../objects/name-data';
import { NameDataRow } from '../name-data-row/name-data-row';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NameType } from '../../enum/nameType';
import { TableFilterType } from '../../enum/table-filter-type';
import replaceSpecialCharacters from 'replace-special-characters';
import { LocalDbService } from '../services/local-db-service';
 
@Component({
  selector: 'app-name-data-table',
  imports: [NameDataRow,MatIconModule,MatButtonModule,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,ReactiveFormsModule],
  providers:[CdkColumnDef],
  templateUrl: './name-data-table.html',
  styleUrl: './name-data-table.scss'
})
export class NameDataTable implements OnInit{
  constructor(
        private localDbService : LocalDbService
  ){}
  @Input() nameDatas : NameData[] = [] //TODO COMPORTEMENT ICI A REFACTORISER
  @Output() viewEvent = new EventEmitter<NameData>();
  changeTypeIndex : number = 0
  orderType : boolean = false
  totalUseOrder : boolean = false
  alphabeticalOrderName : boolean = false
  filteredNoms : NameData[] = []
  nameDataArrayIndex : number = 0
  pageIndex : number = 0
  typeFormControl = new FormControl("ALL")
  filterdNameFormControl = new FormControl()
  filterdNameWihtoutSpecialChar : string = ""
  selectedFilters : TableFilterType[] = []
  typeHommeIndex : number = 0
  typeFemmeIndex : number = 0
  indexbound = 100
  async ngOnInit() {
    await this.initNameData()
    this.initFormsSub()
    this.setnameDataFromPageIndex()
  }

  initFormsSub(){
    this.typeFormControl.valueChanges.subscribe(
      (value)=>{
        if(value != "ALL"){
          this.addFilter(TableFilterType.TYPE)
        }
        else{
          this.removeFilter(TableFilterType.TYPE)
        }
        this.setnameDataFromPageIndex(undefined,true)
      }
    )
    this.filterdNameFormControl.valueChanges.subscribe(
      value=>{
        if(value == null || value == ""){
          this.removeFilter(TableFilterType.NAME)
        }
        else{
          this.filterdNameWihtoutSpecialChar = replaceSpecialCharacters(value)
          this.addFilter(TableFilterType.NAME)
        }
      this.setnameDataFromPageIndex(undefined,true)

      }
    )
  }
  onViewEvent(nameData : NameData){
    this.viewEvent.emit(nameData)
  }
  addFilter(filterType :TableFilterType){
    if(!this.selectedFilters.find((element) => element == filterType)){
      this.selectedFilters.push(filterType)
    }
      if(filterType == TableFilterType.TYPE){
        if(this.typeFormControl.value == NameType.FEMME){
          this.nameDataArrayIndex = Number(this.typeFemmeIndex) //Constructeur number pour éviter les pointeur
        }
        else{
          this.nameDataArrayIndex = Number(this.typeHommeIndex)
        }
      }
  }
  removeFilter(filterType :TableFilterType){
    this.selectedFilters =  this.selectedFilters.splice(this.selectedFilters.findIndex((element)=> element == filterType),0)
    this.nameDataArrayIndex = 0

  }
  get disableNextPreviousButton(){
    return this.selectedFilters.find((element) => element == TableFilterType.NAME)
  }
  
  setnameDataFromPageIndex(action ?: string, resetPageIndex ?: boolean){
    (this.nameDatas.length)
    this.filteredNoms = []
    if(action == "NEXT" && this.nameDatas.length <= this.nameDatas.length + this.indexbound ){
      this.nameDataArrayIndex += this.indexbound
      this.pageIndex++
  
    }
    else if (action == "PREVIOUS" && this.nameDataArrayIndex > 0){
        this.nameDataArrayIndex -= this.indexbound
        this.pageIndex--
    }
    if(resetPageIndex){
      this.pageIndex = 0
    }

    let index = structuredClone(this.nameDataArrayIndex)
    while(index < this.nameDatas.length){
      if(this.applyFilter(this.nameDatas[index])){
      this.filteredNoms.push(this.nameDatas[index])
      }
      if(this.filteredNoms.length > 99){
        break
      }
      index++
    }
  }

  resetIndexFromFilter(){
    this.pageIndex = 0 
    this.pageIndex = 0 
  }

  async initNameData(){
    this.resetIndexFromFilter()
    this.nameDatas = await this.localDbService.getNamesDatas()
    this.typeFemmeIndex = this.nameDatas.findIndex((element)=> element.nameType == NameType.FEMME)
    this.typeHommeIndex = this.nameDatas.findIndex((element)=> element.nameType == NameType.HOMME)
  }

  applyFilter(name : NameData){
    let successCondition : number = 0
    if(this.selectedFilters.length == 0){
      return true
    }
    else{
      //pourrait être simplifier
      for( let filter of this.selectedFilters){
        if(filter == TableFilterType.TYPE && name.nameType == this.typeFormControl.value){ 
        successCondition++
        }
       if(filter == TableFilterType.NAME && name.name?.toUpperCase().match(this.filterdNameWihtoutSpecialChar.toUpperCase())) {
        successCondition++  
        }
      }
      if(successCondition == this.selectedFilters.length){
        return true
      }
    }
    return false
  }
  orderByTotalOfUse(){
    this.initNameData()
    if(!this.totalUseOrder){
      this.nameDatas = this.nameDatas.sort((a,b) => a.totalUse - b.totalUse)
    }
    else{
      this.nameDatas = this.nameDatas.sort((a,b) => b.totalUse - a.totalUse)
    }
    this.totalUseOrder = !this.totalUseOrder
    this.setnameDataFromPageIndex(undefined,true)
  }
  compareStringAlphabetical(nameA : string, nameB : string){
     if (nameA < nameB) {
       return -1;
     }
     if (nameA > nameB) {
       return 1;
     }
    return 0;
  }

  orderByAlphabetical(){
    this.initNameData()
    this.nameDatas.sort((a, b) => {
      if(!this.alphabeticalOrderName){
       return this.compareStringAlphabetical(a.name!.toUpperCase(),b.name!.toUpperCase())    
      }
      else{
       return this.compareStringAlphabetical(b.name!.toUpperCase(),a.name!.toUpperCase())    
      }
    }

  )
    this.alphabeticalOrderName =!this.alphabeticalOrderName
    this.setnameDataFromPageIndex(undefined,true)
  }
  orderByType(){
    this.initNameData()
    this.nameDatas.sort((a, b) => {
      if(!this.orderType){
       return this.compareStringAlphabetical(a.nameType!.toUpperCase(),b.nameType!.toUpperCase())    
      }
      else{
       return this.compareStringAlphabetical(b.nameType!.toUpperCase(),a.nameType!.toUpperCase())    
      }
    }

  )
    this.orderType = !this.orderType
    this.setnameDataFromPageIndex()
  }
  grayBackground(rowIndex : number){
    if(rowIndex%2 == 1){
      return ""
    }
    else{
      return "grayRow"
    }
  }

}
