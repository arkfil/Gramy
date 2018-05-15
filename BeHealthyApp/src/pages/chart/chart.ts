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

  private systolicPressureDataPoints: Array<ChartDataPoint>;
  private diastolicPressureDataPoints: Array<ChartDataPoint>;
  private pulseDataPoints: Array<ChartDataPoint>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {

      this.afAuth.authState.take(1).subscribe(auth=>{
        this.userId = auth.uid;});
      }

  ionViewDidLoad() {

    this.renderChart();
  }
  
  private renderChart(): void {
    this.systolicPressureDataPoints = new Array<ChartDataPoint>();
    this.diastolicPressureDataPoints = new Array<ChartDataPoint>();
    this.pulseDataPoints = new Array<ChartDataPoint>();

    this.afDatabase.list(`measures/${this.userId}`).valueChanges().take(1).subscribe(response => {
        if (response) {
          this.mapDatabaseResponse(response);

          this.InitChart();
        }
      });
  }

  private mapDatabaseResponse(measurements): void {
    measurements.forEach(measurement => {
      let measureDate = new Date(measurement.date);

      this.systolicPressureDataPoints.push({ x: measureDate, y: measurement.systolic_pressure });
      this.diastolicPressureDataPoints.push({ x: measureDate, y: measurement.diastolic_pressure });
      this.pulseDataPoints.push({ x: measureDate, y: measurement.pulse });
    });
  }

  private InitChart(): void {
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

    this.chart.render();
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
