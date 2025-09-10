import { Component, Input, OnInit } from '@angular/core';
import { NameData } from '../objects/name-data';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-name-data-view',
  imports: [MatListModule, MatDividerModule, MatIconModule,MatExpansionModule],
  templateUrl: './name-data-view.html',
  styleUrl: './name-data-view.scss'
})
export class NameDataView implements OnInit{

  @Input() nameData : NameData|null = null
  ngOnInit(): void {
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
