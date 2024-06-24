import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrl: './weight-chart.component.scss',
})
export class WeightChartComponent implements OnInit {
  showConfirmDeleteModal: boolean = false;

  chart: any = {
    chartType: 'LineChart',
    dataTable: [],
    columns: ['Datum', 'Gewicht'],
    options: {
      title: 'Gewichtsverlauf',
      hAxis: { title: 'Datum', format: 'dd.MM.yyyy' },
      vAxis: { title: 'Gewicht (kg)' },
      language: 'de',
      fontName: 'Helvetica',
      interpolateNulls: true,
      explorer: { axis: 'dragToZoom', keepInBounds: true },
      curveType: 'function',
      legend: { position: 'none' },
      chartArea: { width: '80%', height: '80%' },
      pointSize: 5,
      colors: ['red', '#3366CC'],
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
  this.loadWeightData();
}

loadWeightData(): void {
  const userId = this.authService.getIdFromToken();
  this.dataService.getAllWeightData(userId).subscribe((response) => {
    if (response && response.length > 0) {
      const chartData = response.map((entry: { date: string | number | Date; weight: any; }) => {
        const date = new Date(entry.date);
        return [date, Number(entry.weight)];
      });
      this.chart.dataTable = chartData;
    } else {
      this.chart = null;
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
