import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-bmi-chart',
  templateUrl: './bmi-chart.component.html',
  styleUrl: './bmi-chart.component.scss'
})
export class BmiChartComponent implements OnInit{
  chart: any = {
    chartType: 'LineChart',
    dataTable: [
    ],
    columns: ['Date', 'BMI'],
    options: {
      title: 'Gewichtsverlauf',
      hAxis: { title: 'Datum' },
      vAxis: { title: 'BMI' },
      fontName: "Helvetica",
      interpolateNulls: true,
      explorer: { axis: "dragToZoom", keepInBounds: true },
      curveType: "function",
      legend: { position: "none" },
      chartArea: { width: "80%", height: "80%" },
      pointSize: 5,
      colors: ["red", "#3366CC"],
      chartType: 'LineChart',
      dataTable: [],
      width: 1200,
      height: 600,
    },
  };

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  
 ngOnInit(): void {
  this.loadBMIData();
   
 }

  loadBMIData(): void {
    const userId = this.authService.getIdFromToken();
    this.dataService.getBmiData(userId).subscribe((response) => {
        const chartData = response.map((entry: { date: string | number | Date; weight: any; }) => [new Date(entry.date), Number(entry.weight)]);
        this.chart.dataTable = chartData;
      });
  }
}
