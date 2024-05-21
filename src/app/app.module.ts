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
import { JwtModule } from "@auth0/angular-jwt";
import { jwtDecode } from "jwt-decode";
import { ProfileComponent } from './profile/profile.component';
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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
