import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

import { AddUserComponent } from './add-user/add-user.component';
import { MainViewComponent } from './main-view/main-view.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UtilService } from './util.service';
import { AuthService } from './auth.service';
import { Error404Component } from './error404/error404.component';

import { RequestInterceptorService } from './request-interceptor.service';

//module 선언
@NgModule({

  declarations: [
    AppComponent,
    EmployeeComponent,
    HeaderComponent,
    FooterComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    AddUserComponent,
    MainViewComponent,
    AddUserComponent,
    SignInComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },    
    UtilService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
