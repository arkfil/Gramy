import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../CanvasJS';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Dzienne statystyki pomiaru"
      },
      axisY: [{
        title: "Ciśnienie",
        lineColor: "#C24642",
        tickColor: "#C24642",
        labelFontColor: "#C24642",
        titleFontColor: "#C24642",
        suffix: "mmHg"
      }],
      axisY2: {
        title: "Tętno",
        lineColor: "#7F6084",
        tickColor: "#7F6084",
        labelFontColor: "#7F6084",
        titleFontColor: "#7F6084",
        suffix: "/min"
      },
      axisX: {
        valueFormatString: "DD-MM-YY HH:mm"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: [{
        type: "line",
        name: "Ciśnienie skurczowe",
        color: "#369EAD",
        showInLegend: true,
        axisYIndex: 0,
        dataPoints: [
          { x: new Date(2017, 0, 7), y: 85.4 },
          { x: new Date(2017, 0, 14), y: 92.7 },
          { x: new Date(2017, 0, 21), y: 64.9 },
          { x: new Date(2017, 0, 28), y: 58.0 },
          { x: new Date(2017, 1, 4), y: 63.4 },
          { x: new Date(2017, 1, 11), y: 69.9 },
          { x: new Date(2017, 1, 18), y: 88.9 },
          { x: new Date(2017, 1, 25), y: 66.3 },
          { x: new Date(2017, 2, 4), y: 82.7 },
          { x: new Date(2017, 2, 11), y: 60.2 },
          { x: new Date(2017, 2, 18), y: 87.3 },
          { x: new Date(2017, 2, 25), y: 98.5 }
        ]
      },
      {
        type: "line",
        name: "Ciśnienie rozkurczowe",
        color: "#C24642",
        axisYIndex: 0,
        showInLegend: true,
        dataPoints: [
          { x: new Date(2017, 0, 7), y: 32.3 },
          { x: new Date(2017, 0, 14), y: 33.9 },
          { x: new Date(2017, 0, 21), y: 26.0 },
          { x: new Date(2017, 0, 28), y: 15.8 },
          { x: new Date(2017, 1, 4), y: 18.6 },
          { x: new Date(2017, 1, 11), y: 34.6 },
          { x: new Date(2017, 1, 18), y: 37.7 },
          { x: new Date(2017, 1, 25), y: 24.7 },
          { x: new Date(2017, 2, 4), y: 35.9 },
          { x: new Date(2017, 2, 11), y: 12.8 },
          { x: new Date(2017, 2, 18), y: 38.1 },
          { x: new Date(2017, 2, 25), y: 42.4 }
        ]
      },
      {
        type: "line",
        name: "Tętno",
        color: "#7F6084",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: [
          { x: new Date(2017, 0, 7), y: 42.5 },
          { x: new Date(2017, 0, 14), y: 44.3 },
          { x: new Date(2017, 0, 21), y: 28.7 },
          { x: new Date(2017, 0, 28), y: 22.5 },
          { x: new Date(2017, 1, 4), y: 25.6 },
          { x: new Date(2017, 1, 11), y: 45.7 },
          { x: new Date(2017, 1, 18), y: 54.6 },
          { x: new Date(2017, 1, 25), y: 32.0 },
          { x: new Date(2017, 1, 4), y: 43.9 },
          { x: new Date(2017, 2, 11), y: 26.4 },
          { x: new Date(2017, 2, 18), y: 40.3 },
          { x: new Date(2017, 2, 25), y: 54.2 }
        ]
      }]
    });
    chart.render();
  }

  private toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }
}
