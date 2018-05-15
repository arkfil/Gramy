import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as CanvasJS from '../../CanvasJS.js';
import { Chart, ChartDataPoint } from 'canvasjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  userId: string;
  private chartContainerId: string = 'chartContainer'
  private chart: Chart;

  private systolicPressureDataPoints: ChartDataPoint[];
  private diastolicPressureDataPoints: ChartDataPoint[];
  private pulseDataPoints: ChartDataPoint[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {

    try {
      this.afAuth.authState.subscribe(data => {
        if (data.email && data.uid) {
          this.userId = data.uid;
          console.log('logged in measure actv: ' + data);
        } else {
          console.log('should do something to get rid of the user! He is not logged in!');
        }
      });
    } catch (e) {
      console.log('could not get userId' + e)
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
    
    this.setChartData();
    this.InitChart(this.chartContainerId);
    this.chart.render();
  }

  private setChartData() : void {
    this.systolicPressureDataPoints = [
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
    ];

    this.diastolicPressureDataPoints = [
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

    this.pulseDataPoints = [
      { x: new Date(2017, 0, 7), y: 42.5 },
      { x: new Date(2017, 0, 14), y: 44.3 },
      { x: new Date(2017, 0, 21), y: 28.7 },
      { x: new Date(2017, 0, 28), y: 22.5 },
      { x: new Date(2017, 1, 4), y: 25.6 },
      { x: new Date(2017, 1, 11), y: 45.7 },
      { x: new Date(2017, 1, 18), y: 54.6 },
      { x: new Date(2017, 1, 25), y: 32.0 },
      { x: new Date(2017, 2, 4), y: 43.9 },
      { x: new Date(2017, 2, 11), y: 26.4 },
      { x: new Date(2017, 2, 18), y: 40.3 },
      { x: new Date(2017, 2, 25), y: 54.2 }
    ]
  }

  private InitChart(chartContainerId: string): void {
    this.chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Daily statistics"
      },
      axisY: [{
        title: "Pressure",
        lineColor: "#C24642",
        tickColor: "#C24642",
        labelFontColor: "#C24642",
        titleFontColor: "#C24642",
        suffix: "mmHg"
      }],
      axisY2: {
        title: "Pulse (Heart rate)",
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
        name: "Systolic pressure",
        color: "#369EAD",
        showInLegend: true,
        axisYIndex: 0,
        dataPoints: this.systolicPressureDataPoints
      },
      {
        type: "line",
        name: "Diastolic pressure",
        color: "#C24642",
        axisYIndex: 0,
        showInLegend: true,
        dataPoints: this.diastolicPressureDataPoints
      },
      {
        type: "line",
        name: "Pulse",
        color: "#7F6084",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: this.pulseDataPoints
      }]
    });
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
