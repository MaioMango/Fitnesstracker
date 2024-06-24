import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calories-chart',
  templateUrl: './calories-chart.component.html',
  styleUrl: './calories-chart.component.scss'
})
export class CaloriesChartComponent implements OnInit {
  showConfirmDeleteModal: boolean = false;

  chart: any = {
    chartType: 'LineChart',
    dataTable: [
    ],
    columns: ['Date', 'Kalorien'],
    options: {
      title: 'Kalorienverlauf',
      hAxis: { title: 'Datum' },
      vAxis: { title: 'Konsumierte Kcal' },
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
      width: 1450,
      height: 400,
      titleTextStyle: {
        fontSize: 24,
        bold: true,
        color: '#000'
      }
    },
  };

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router

  ) { }


  ngOnInit(): void {
    this.loadCalorieData();
  }

  loadCalorieData(): void {
    const userId = this.authService.getIdFromToken();
    this.dataService.getAllCalorieData(userId).subscribe((response) => {
      if (response && response.length > 0) {
        const chartData = response.map((entry: { date: string | number | Date; calories: any; }) => {
          const date = new Date(entry.date);
          const formattedDate = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
          return [formattedDate, Number(entry.calories)];
        });
        this.chart.dataTable = chartData;
      }
    });
  }

  openDeleteConfirmation() {
    this.showConfirmDeleteModal = true;
  }
  
  deleteData() {
    
  }
  
  cancelDelete() {
    this.showConfirmDeleteModal = false;
  }
  
  navigateToChart(chartType: string): void {
    this.router.navigate([chartType]);
  }

  navigateToProfile(): void {
    this.router.navigate(['profile']);
  }
}
