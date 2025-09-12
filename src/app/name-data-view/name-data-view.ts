import { Component, Input, OnInit } from '@angular/core';
import { NameData } from '../objects/name-data';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule} from '@angular/material/expansion';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import {  LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsCoreOption } from 'echarts/core';
echarts.use([LineChart, GridComponent, CanvasRenderer])
@Component({
  selector: 'app-name-data-view',
  imports: [MatListModule, MatDividerModule, MatIconModule,MatExpansionModule,NgxEchartsDirective],
  templateUrl: './name-data-view.html',
  styleUrl: './name-data-view.scss',
  providers: [provideEchartsCore({ echarts })],
})
export class NameDataView implements OnInit{

  @Input() nameData : NameData|null = null
  yearsData : string[] = []
  yearsValue : number[] =[]
  ngOnInit(): void {
    this.extractNameData()
  }
    grayBackground(rowIndex : number){
    if(rowIndex%2 == 1){
      return ""
    }
    else{
      return "grayRow"
    }
  }
  extractNameData(){

    for(let year of this.nameData!.years){
      this.yearsData.push(year.digits)
      this.yearsValue.push(year.value)
    }
  }
  chartOption: EChartsCoreOption = {
  xAxis: {
    type: 'category',
    data: this.yearsData
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: this.yearsValue,
      type: 'line',
    },
  ],
};


}
