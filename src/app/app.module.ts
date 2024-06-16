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
import { FoodInfoModalComponent } from './barcodescanner/food-info-modal/food-info-modal.component';
import { ExistingFoodModalComponent } from './barcodescanner/existing-food-modal/existing-food-modal.component';
import { BarcodeInfoModalComponent } from './barcodescanner/barcode-info-modal/barcode-info-modal.component';
import { JwtModule } from "@auth0/angular-jwt";
import { jwtDecode } from "jwt-decode";
import { ProfileComponent } from './profile/profile.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { CalorieInfoModalComponent } from './caloriecalculator/calorie-info-modal/calorie-info-modal.component';
import { BmiInfoModalComponent } from './bmi/bmi-info-modal/bmi-info-modal.component';
import { PasswordComponent } from './password/password.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManualBarcodescannerModalComponent } from './barcodescanner/manual-barcodescanner-modal/manual-barcodescanner-modal.component';
import { WeightChartComponent } from './profile/weight-chart/weight-chart.component';
import { BmiChartComponent } from './profile/bmi-chart/bmi-chart.component';
import { CaloriesChartComponent } from './profile/calories-chart/calories-chart.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment.prod';

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
    ProfileComponent,
    BarcodescannerComponent,
    FoodInfoModalComponent,
    ExistingFoodModalComponent,
    BarcodeInfoModalComponent,
    CookieBannerComponent,
    CalorieInfoModalComponent,
    BmiInfoModalComponent,
    PasswordComponent,
    ManualBarcodescannerModalComponent,
    WeightChartComponent,
    BmiChartComponent,
    CaloriesChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ZXingScannerModule,
    JwtModule,
    GoogleChartsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
