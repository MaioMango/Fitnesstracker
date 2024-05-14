import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BmiComponent } from './bmi/bmi.component';
import { CaloriecalculatorComponent } from './caloriecalculator/caloriecalculator.component';
import { WeightComponent } from './weight/weight.component';
import { AgbComponent } from './agb/agb.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ImprintComponent } from './imprint/imprint.component';
import { RegisterComponent } from './register/register.component';
import { BarcodescannerComponent } from './barcodescanner/barcodescanner.component';
import { FoodInfoModalComponent } from './food-info-modal/food-info-modal.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'barcodescanner', component: BarcodescannerComponent }, 
  { path: 'barcodescanner/add', component: FoodInfoModalComponent }, 
  { path: 'bmi', component: BmiComponent }, 
  { path: 'calories', component: CaloriecalculatorComponent },
  { path: 'weight', component: WeightComponent },
  { path: 'agb', component: AgbComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
