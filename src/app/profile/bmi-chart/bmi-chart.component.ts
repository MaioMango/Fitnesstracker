import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bmi-chart',
  templateUrl: './bmi-chart.component.html',
  styleUrl: './bmi-chart.component.scss'
})
export class BmiChartComponent implements OnInit {
  showConfirmDeleteModal: boolean = false;
  userId!: number;
  deleteSuccess: boolean = false;
  deleteFail: boolean = false;

  chart: any = {
    chartType: 'LineChart',
    dataTable: [
    ],
    columns: ['Date', 'BMI'],
    options: {
      title: 'BMI-Verlauf',
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
    this.userId = this.authService.getIdFromToken();
    this.loadBMIData();
  }

  loadBMIData(): void {
    const userId = this.authService.getIdFromToken();
    this.dataService.getAllBmiData(userId).subscribe((response) => {
      if (response && response.length > 0) {
        const chartData = response.map((entry: { date: string | number | Date; bmi: any; }) => {
          const date = new Date(entry.date);
          const formattedDate = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
          return [formattedDate, Number(entry.bmi)];
        });
        this.chart.dataTable = chartData;
      }
    });
  }

  openDeleteConfirmation() {
    this.showConfirmDeleteModal = true;
  }
  
  deleteData() {
    if (this.userId) {
      this.showConfirmDeleteModal = false;
      this.dataService.deleteBMIData(this.userId).subscribe(() => {
        this.loadBMIData();
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteSuccess = false;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/profile/bmi']);
          });
        }, 3000);
      }, (error) => {
        this.deleteFail = true;
        setTimeout(() => {
        this.deleteSuccess = false;
        }, 3000);
        console.error('Fehler beim Löschen der Daten:', error);
      });
    } else {
      console.error('Fehler: userId ist null oder undefined');
    }
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