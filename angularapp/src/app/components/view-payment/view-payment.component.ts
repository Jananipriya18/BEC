import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.css']
})
export class ViewPaymentComponent implements OnInit {

  payments!: any[];

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    const paymentData = {}; // Add your payment data here
    this.paymentService.getAllPayments(paymentData).subscribe((payments: any[]) => { 
      this.payments = payments;
    });
  }

}
