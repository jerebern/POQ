import { Component, Input } from '@angular/core';
import { NameData } from '../objects/name-data';

@Component({
  selector: 'tr[app-name-data-row]',
  imports: [],
  templateUrl: './name-data-row.html',
  styleUrl: './name-data-row.scss'
})
export class NameDataRow {
  @Input() nameData : NameData|null = null
}
