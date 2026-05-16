import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NameData } from '../objects/name-data';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Year } from '../objects/year';

@Component({
  selector: 'tr[app-name-data-row]',
  imports: [MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './name-data-row.html',
  styleUrl: './name-data-row.scss',
})
export class NameDataRow implements OnInit {
  ngOnInit(): void {
    this.extractYears();
  }
  @Input() nameData: NameData | null = null;
  @Input() rowIndex: number = 0;
  @Output() viewEvent = new EventEmitter<NameData>();
  years: Year[] = [];

  viewClickEvent() {
    if (this.nameData != null) {
      this.viewEvent.emit(this.nameData);
    }
  }
  extractYears() {
    if (this.nameData) {
      this.years = JSON.parse(this.nameData.years);
    }
  }
}
