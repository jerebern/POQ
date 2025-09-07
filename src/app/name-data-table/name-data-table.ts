import { Component, Input, OnInit } from '@angular/core';
import { NameData } from '../objects/name-data';
import { NameDataRow } from '../name-data-row/name-data-row';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-name-data-table',
  imports: [NameDataRow,MatFormField,MatIcon,MatLabel,MatHint,MatButton,MatIcon],
  templateUrl: './name-data-table.html',
  styleUrl: './name-data-table.scss'
})
export class NameDataTable implements OnInit{
  @Input() noms : NameData[] = []
  filteredNoms : NameData[] = []
  pageIndex : number = 0

  ngOnInit(): void {
   this.setnameDataFromPageIndex()
  }
  
  setnameDataFromPageIndex(action ?: string){
    this.filteredNoms = []
    if(action == "NEXT"){
      this.pageIndex += 100
    }
    else if (action == "PREVIOUS"){
      if(this.pageIndex >= 0){
        this.pageIndex-=100
      }
    }
    for(let i = this.pageIndex; i<this.pageIndex + 100; i++){
      this.filteredNoms.push(this.noms[i])
    }
  }
}
