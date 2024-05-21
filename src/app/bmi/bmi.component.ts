import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss'],
})
export class BmiComponent implements OnInit {
  bmiForm: FormGroup = new FormGroup({});

  bmi: number = 0;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.bmiForm = this.formBuilder.group({
      age: '',
      gender: '',
      height: '',
      weight: '',
      date: ''
    });
  }

  calculateBMI(): void {
    const height = this.bmiForm.value.height / 100; // convert height from cm to m
    const weight = this.bmiForm.value.weight;
    this.bmi = weight / (height * height);
  }

  save(): void {
    const userId = '123';
    const bmi = this.bmi;
    const date = this.bmiForm.value.date;

    const bmiData = { userId, bmi, date };

    this.http.post<any>('http://localhost:3000/bmi', bmiData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Fehler beim Speichern des BMI:', error);
      },
    });
  }
}
