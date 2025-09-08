import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NameData } from '../objects/name-data';
import { NameDataRow } from '../name-data-row/name-data-row';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';

@Component({
  selector: 'app-name-data-table',
  imports: [NameDataRow,MatFormFieldModule,MatIconModule,MatButtonModule],
  providers:[CdkColumnDef],
  templateUrl: './name-data-table.html',
  styleUrl: './name-data-table.scss'
})
export class NameDataTable implements OnInit{
  @Input() noms : NameData[] = []
  @Output() viewEvent = new EventEmitter<NameData>();

  filteredNoms : NameData[] = []
  pageIndex : number = 0

  ngOnInit(): void {
   this.setnameDataFromPageIndex()
  }
  onViewEvent(nameData : NameData){
    console.log(nameData)
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
    for(let i = this.pageIndex; i<this.pageIndex + 100; i++){
      this.filteredNoms.push(this.noms[i])
    }
  }
  grayColor(rowIndex : number){
    if(rowIndex%2 == 1){
      return ""
    }
    else{
      return "grayRow"
    }
  }
}
