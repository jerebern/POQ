import { Component, Input } from '@angular/core';
import { NameData } from '../objects/name-data';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'tr[app-name-data-row]',
  imports: [MatButton],
  templateUrl: './name-data-row.html',
  styleUrl: './name-data-row.scss'
})
export class NameDataRow {
  @Input() nameData : NameData|null = null

  get utilisationTotal(){
    let total = 0
    for(let year of this.nameData!.years){
      total += Number(year.value)
    }
    return total
  }
}
