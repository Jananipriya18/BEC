import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './authguard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
// import { OrganizerComponent } from './organizer/organizer.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StudentComponent } from './components/student/student.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { AddEnquiryComponent } from './components/add-enquiry/add-enquiry.component';
import { ViewEnquiryComponent } from './components/view-enquiry/view-enquiry.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { ViewPaymentComponent } from './components/view-payment/view-payment.component';
import { ViewStudentsComponent } from './components/view-students/view-students.component';
import { ViewMyEnquiryComponent } from './components/view-my-enquiry/view-my-enquiry.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'admin/dashboard', component: AdminComponent },
  { path: 'student/dashboard', component: StudentComponent },
  { path: 'course/add', component: AddCourseComponent },
  { path: 'courses/view', component: ViewCourseComponent },
  { path: 'enquiry/add', component: AddEnquiryComponent },
  { path: 'enquiry/view', component: ViewEnquiryComponent },
  { path: 'payment/make', component: AddPaymentComponent },
  { path: 'payments/view', component: ViewPaymentComponent },
  { path: 'students/view', component: ViewStudentsComponent },
  { path: 'myenquiry/view', component: ViewMyEnquiryComponent },
  {
    path: 'error',
    component: ErrorComponent,
    data: { message: 'Oops! Something went wrong.' },
  },
  { path: '**', redirectTo: '/error', pathMatch: 'full' }, // Handle all other routes and redirect to the error page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
