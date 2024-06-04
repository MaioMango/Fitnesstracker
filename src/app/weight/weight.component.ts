import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  SaveSuccess: boolean = false;
  SaveFail: boolean = false;
  weightForm: FormGroup = new FormGroup({});
  chart: any = {
    chartType: 'LineChart',
    dataTable: [
    ],
    columns: ['Date', 'Weight'],
    options: {
      title: 'Gewichtsverlauf',
      hAxis: { title: 'Datum' },
      vAxis: { title: 'Gewicht (kg)' },
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
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.weightForm = this.formBuilder.group({
      weight: '',
      date: new Date().toISOString().split('T')[0]
    });
    this.loadWeightData();
  }

  save(): void {
    if (!this.weightForm.valid) {
      return;
    }
    const userid = this.authService.getIdFromToken();
    const weight = this.weightForm.value.weight;
    const selectedDate = this.weightForm.value.date;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${selectedDate}T${hours}:${minutes}:${seconds}`;
    const weightData = { userid, weight, date: formattedDate };

    this.http.post<any>('http://localhost:3000/weight', weightData).subscribe({
      next: (response) => {
        console.log(response);
        this.loadWeightData(); // Daten neu laden nach dem Speichern
        this.SaveSuccess = true;
        setTimeout(() => {
          this.SaveSuccess = false;
        }, 3000);
      },
      error: (error) => {
        console.error('Fehler beim Speichern des Gewichts:', error);
        this.SaveFail = true;
        setTimeout(() => {
          this.SaveFail = false;
        }, 3000);
      },
    });
  }

  loadWeightData(): void {
    const userid = this.authService.getIdFromToken();
    this.http.get<any[]>(`http://localhost:3000/weights/${userid}`).subscribe({
      next: (response) => {
        const chartData = response.map(entry => [new Date(entry.date), Number(entry.weight)]);
        this.chart.dataTable = chartData;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Gewichtsdaten:', error);
      }
    });
  }
}
