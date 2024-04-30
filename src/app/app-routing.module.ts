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

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'bmi', component: BmiComponent }, 
  { path: 'calories', component: CaloriecalculatorComponent },
  { path: 'weight', component: WeightComponent },
  { path: 'agb', component: AgbComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
