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
    this.bmi = weight / (height * height);
  }
}