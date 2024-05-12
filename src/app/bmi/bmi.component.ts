import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss']
})
export class BmiComponent implements OnInit {
  bmiForm: FormGroup = new FormGroup({});

  bmi: number = 0;
  bmiDate: Date | null = null;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.bmiForm = this.formBuilder.group({
      age: '',
      gender: '',
      height: '',
      weight: ''
    });
  }


  calculateBMI(): void {
    const height = this.bmiForm.value.height / 100; // convert height from cm to m
    const weight = this.bmiForm.value.weight;
    this.bmi = Math.round((weight / (height * height)) * 100) / 100;
    
    // Set the current date when BMI is calculated
    this.bmiDate = new Date();

    this.addBMI(this.bmi, this.bmiDate);
}

  addBMI(bmi: number, bmidate: Date): void {
    /* Da das BMI hinzufügen noch nicht implementiert ist, ist hier eine Mock-Funktion  */
    console.log('BMI added:', bmi, 'on date:', bmidate);
  }
}