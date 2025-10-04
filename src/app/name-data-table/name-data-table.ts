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

@Component({
  selector: 'app-name-data-table',
  imports: [NameDataRow,MatIconModule,MatButtonModule,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule,ReactiveFormsModule],
  providers:[CdkColumnDef],
  templateUrl: './name-data-table.html',
  styleUrl: './name-data-table.scss'
})
export class NameDataTable implements OnInit{
  @Input() nameDatas : NameData[] = []
  @Output() viewEvent = new EventEmitter<NameData>();
  nameDatasOG : NameData[] = []
  orderType : boolean = false
  totalUseOrder : boolean = false
  alphabeticalOrderName : boolean = false
  filteredNoms : NameData[] = []
  pageIndex : number = 0
  typeFormControl = new FormControl()
  selectedFilters : TableFilterType[] = []
  ngOnInit(): void {
    //structureClone permets une copie complète en mémoire, sinon JS utilise des pointeur 
    this.nameDatasOG = structuredClone(this.nameDatas)
    this.typeFormControl.valueChanges.subscribe(
      value=>{
        if(value != "ALL"){
          this.addFilter(TableFilterType.TYPE)
        }
        else{
          this.removeFilter(TableFilterType.TYPE)
        }
      }
    )
   this.setnameDataFromPageIndex()
  }
  onViewEvent(nameData : NameData){
    this.viewEvent.emit(nameData)
  }
  addFilter(filterType :TableFilterType){
    if(!this.selectedFilters.find((element) => element == filterType)){
      this.selectedFilters.push(filterType)
    }
    this.setnameDataFromPageIndex(undefined,true)
  }
  removeFilter(filterType :TableFilterType){
    this.selectedFilters =  this.selectedFilters.splice(this.selectedFilters.findIndex((element)=> element == filterType),0)
    this.setnameDataFromPageIndex(undefined,true)
  }
  setnameDataFromPageIndex(action ?: string, resetPageIndex ?: boolean){
    console.log(this.selectedFilters)
    this.filteredNoms = []
    let index = 0;
    if(action == "NEXT"){
      this.pageIndex += 100
    }
    else if (action == "PREVIOUS"){
      if(this.pageIndex != 0){
        this.pageIndex-=100
      }
    }
    if(resetPageIndex){
      this.pageIndex =0
    }

    while(index < this.pageIndex + 100 && index < this.nameDatas.length && this.filteredNoms.length != 99){
      if(this.applyFilter(this.nameDatas[index])){
      this.filteredNoms.push(this.nameDatas[index])
      }
      index++
    }

  }

  applyFilter(name : NameData){
    if(this.selectedFilters.length == 0){
      return true
    }
    else{
      console.log(this.typeFormControl.value + " vs " + name.nameType)
    for( let filter of this.selectedFilters){
      switch(filter){
        case TableFilterType.TYPE:
          if(name.nameType == this.typeFormControl.value){
            console.log(name)
            return true
          }
        break;
      }
    }
    }
    return false
  }
  orderByTotalOfUse(){
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

  // names must be equal
    return 0;
  }

  orderByAlphabetical(){
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
    this.setnameDataFromPageIndex(undefined,true)
  }
  grayBackground(rowIndex : number){
    if(rowIndex%2 == 1){
      return ""
    }
    else{
      return "grayRow"
    }
  }
  get strPageInformation(){
    return this.pageIndex + 1 + " - " + Number(this.pageIndex+100)+ " / "+ this.nameDatas.length
  }

}
