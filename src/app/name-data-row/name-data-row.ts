import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NameData } from '../objects/name-data';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'tr[app-name-data-row]',
  imports: [MatButtonModule,MatIconModule,MatTableModule],
  templateUrl: './name-data-row.html',
  styleUrl: './name-data-row.scss'
})
export class NameDataRow {
  @Input() nameData : NameData|null = null
  @Input() rowIndex : number = 0
  @Output() viewEvent = new EventEmitter<NameData>();
  get utilisationTotal(){
    let total = 0
    for(let year of this.nameData!.years){
      total += Number(year.value)
    }
    return total
  }
  viewClickEvent(){
    if(this.nameData != null){
    this.viewEvent.emit(this.nameData)
    }
  }


}
