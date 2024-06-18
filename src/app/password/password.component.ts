import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  passwordForm: FormGroup;
  SaveSuccess: boolean = false;
  SaveFail: boolean = false;
  alertMessage: string = '';
  constructor(
    private fb: FormBuilder, 
    private dataService: DataService, 
    private authService: AuthService
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
          this.alertMessage = response.message;
          this.SaveSuccess = true;
          setTimeout(() => {
            this.SaveSuccess = false;
          }, 3000);
          this.passwordForm.reset();
        },
        error => {
          this.alertMessage = error.error.message
          this.SaveFail = true;
          setTimeout(() => {
            this.SaveFail = false;
          }, 3000);
        }
      );
    }
  }
}
