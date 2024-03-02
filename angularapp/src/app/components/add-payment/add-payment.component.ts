import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  showCourseId:boolean= false; // Define showCourseId property
  paymentData: any = {
    userName: '', // Populate with the actual user ID
    courseId: 0,
    totalAmount: 0,
    status:'PAID',
    modeOfPayment: '',
    paymentDate: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) {}
  showConfirmation: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // this.paymentData.userId = params['userId']; // Populate with the actual user ID
      this.paymentData.userName = localStorage.getItem('currentUser');
      this.paymentData.totalAmount = params['cost'];
      this.paymentData.courseId = params['courseID'];
      this.paymentData.course = { ...params }; // Spread the query parameters into the course object
      console.log('Payment Data:', this.paymentData);
      // const role = localStorage.getItem('userId')
      // console.log(role);
      // {
      //   "paymentID": 0,
      //   "courseId": 0,
      //   "userId": 0,
      //   "status": "string",
      //   "totalAmount": 0,
      //   "paymentDate": "2024-02-27T06:38:42.799Z",
      //   "modeOfPayment": "string"
      // }
    });
  }

  openConfirmation(): void {
    this.showConfirmation = true;
  }

  closeConfirmation(): void {
    this.showConfirmation = false;
  }
  minEnquiryDate(): string {
    const now = new Date();
    return this.formatDate(now);
  }

  maxEnquiryDate(): string {
    const now = new Date();
    now.setDate(now.getDate()); // Allow only up to the next day
    return this.formatDate(now);
  }

  formatDate(date: Date): string {
    const month = (date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  }
  submitPayment() {
    this.paymentService.submitPayment(this.paymentData).subscribe(
      (response) => {
        // Handle successful payment submission
        console.log('Payment submitted:', response);
        alert('Payment Successful');
  
        // Optionally, you can redirect the user after successful payment
        this.router.navigate(['/student/dashboard']);
      },
      (error) => {
        // Handle payment submission error
        console.error('Error submitting payment:', error);
        alert('Payment Failed');
      }
    );
  }
  

}