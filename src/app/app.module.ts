import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BmiComponent } from './bmi/bmi.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CaloriecalculatorComponent } from './caloriecalculator/caloriecalculator.component';
import { WeightComponent } from './weight/weight.component';
import { AgbComponent } from './agb/agb.component';
import { ImprintComponent } from './imprint/imprint.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RegisterComponent } from './register/register.component';
import { BarcodescannerComponent } from './barcodescanner/barcodescanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FoodInfoModalComponent } from './food-info-modal/food-info-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    BmiComponent,
    LoginComponent,
    HomeComponent,
    CaloriecalculatorComponent,
    WeightComponent,
    AgbComponent,
    ImprintComponent,
    PrivacyPolicyComponent,
    RegisterComponent,
    BarcodescannerComponent,
    FoodInfoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
