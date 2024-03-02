import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { StudentComponent } from './components/student/student.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { AddEnquiryComponent } from './components/add-enquiry/add-enquiry.component';
import { ViewEnquiryComponent } from './components/view-enquiry/view-enquiry.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { ViewPaymentComponent } from './components/view-payment/view-payment.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { ViewMyEnquiryComponent } from './components/view-my-enquiry/view-my-enquiry.component';
// import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddCourseComponent,
    NavbarComponent,
    RegistrationComponent,
    LoginComponent,
    StudentComponent,
    ViewCourseComponent,
    AddEnquiryComponent,
    ViewEnquiryComponent,
    AddPaymentComponent,
    ViewPaymentComponent,
    ViewStudentsComponent,
    ViewMyEnquiryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
