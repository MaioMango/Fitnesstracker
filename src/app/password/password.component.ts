import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private dataService: DataService, 
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { 
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  savePassword(): void {
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;
      const userId = this.authService.getIdFromToken();
      const dataWithUserId = { ...formData, userId };

      this.dataService.changePassword(dataWithUserId).subscribe(
        response => {
          this.snackBar.open(response.message, 'Schliessen', {
            duration: 3000,
            panelClass: ['success-snackbar', 'password-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.passwordForm.reset();
        },
        error => {
          this.snackBar.open(error.error.message, 'Schliessen', {
            duration: 3000,
            panelClass: ['error-snackbar', 'password-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      );
    }
  }
}
