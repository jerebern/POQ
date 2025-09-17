import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NameData } from '../objects/name-data';
import { NameDataRow } from '../name-data-row/name-data-row';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CdkColumnDef } from '@angular/cdk/table';

@Component({
  selector: 'app-name-data-table',
  imports: [NameDataRow,MatFormFieldModule,MatIconModule,MatButtonModule],
  providers:[CdkColumnDef],
  templateUrl: './name-data-table.html',
  styleUrl: './name-data-table.scss'
})
export class NameDataTable implements OnInit{
  @Input() nameDatas : NameData[] = []
  @Output() viewEvent = new EventEmitter<NameData>();

  filteredNoms : NameData[] = []
  pageIndex : number = 0
  ngOnInit(): void {
   this.setnameDataFromPageIndex()
  }
  onViewEvent(nameData : NameData){
    this.viewEvent.emit(nameData)
  }
  setnameDataFromPageIndex(action ?: string){
    this.filteredNoms = []
    if(action == "NEXT"){
      this.pageIndex += 100
    }
    else if (action == "PREVIOUS"){
      if(this.pageIndex != 0){
        this.pageIndex-=100
      }
    }
    for(let i = this.pageIndex; i<this.pageIndex + 100 && i<this.nameDatas.length; i++){
      this.filteredNoms.push(this.nameDatas[i])
    }
  }
  orderTabByNumberOfUse(){
    this.nameDatas.sort((a,b) => a.years)
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
    return this.pageIndex + 1 + " - " + Number(this.pageIndex+100)+ " / "+ this.noms.length
  }

}
