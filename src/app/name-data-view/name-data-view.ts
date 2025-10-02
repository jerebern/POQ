import { Component, Input, OnInit } from '@angular/core';
import { NameData } from '../objects/name-data';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule} from '@angular/material/expansion';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import {  LineChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsCoreOption } from 'echarts/core';
echarts.use([LineChart, GridComponent, CanvasRenderer, TooltipComponent,TitleComponent])
@Component({
  selector: 'app-name-data-view',
  imports: [MatListModule, MatDividerModule, MatIconModule, MatExpansionModule, NgxEchartsDirective],
  templateUrl: './name-data-view.html',
  styleUrl: './name-data-view.scss',
  providers: [provideEchartsCore({ echarts })],
})
export class NameDataView implements OnInit{

  @Input() nameData : NameData|null = null
  yearsData : string[] = []
  yearsValue : number[] =[]
  chartOption: EChartsCoreOption|null = null
  useOrder : boolean = true
  yearOrder : boolean = true

  ngOnInit(): void {
    this.extractNameData()
    this.initChart()
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

  initChart(){
      this.chartOption = {
      title: {
            text: this.nameData!.name + " ( "+ this.nameData!.nameType  + " ) \n Utilisation total depuis 1980 : " + this.nameData!.totalUse,
      },
        tooltip: {},
      xAxis: {
        type: 'category',
        data: this.yearsData
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name:"Année",
          data: this.yearsValue,
          type: 'line',
        },
      ],
    };

  }
orderByUse(){
      if(!this.useOrder){
      this.nameData!.years = this.nameData!.years.sort((a,b) => a.value - b.value)
    }
    else{
      this.nameData!.years = this.nameData!.years.sort((a,b) => b.value - a.value)
    }
      this.useOrder = !this.useOrder
}

orderByYear(){
    if(!this.yearOrder){
      this.nameData!.years = this.nameData!.years.sort((a,b) => Number(a.digits) - Number(b.digits))
    }
    else{
      this.nameData!.years = this.nameData!.years.sort((a,b) => Number(b.digits) - Number(a.digits))
    }
      this.yearOrder = !this.yearOrder
}

}
