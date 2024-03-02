import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../services/enquiry.service';
import { Enquiry } from 'src/app/models/enquiry.model';


@Component({
  selector: 'app-view-my-enquiry',
  templateUrl: './view-my-enquiry.component.html',
  styleUrls: ['./view-my-enquiry.component.css']
})
export class ViewMyEnquiryComponent implements OnInit {

  enquiries: Enquiry[];
  userRole: string;
  userId: string;

  constructor(private enquiryService: EnquiryService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole'); // get the user's role from local storage
    this.userId = localStorage.getItem('user');
    this.getEnquiries();
  }

  deleteEnquiry(enquiry: Enquiry): void {
    if (this.userRole !== 'STUDENT') {
      console.error('Access denied. Only students can delete enquiries.');
      return;
    }

    this.enquiryService.deleteEnquiry(enquiry).subscribe(() => {
      this.getEnquiries(); // refresh the list after deleting
    });
  }
  getEnquiries(): void {
    if (this.userRole === 'STUDENT') {
      this.enquiryService.getEnquiriesByUser(this.userId).subscribe(
        enquiries => {
          this.enquiries = enquiries;
        },
        error => {
          console.error('Error getting enquiries:', error);
        }
      );
    } else {
      console.error('Access denied. Only students can view their enquiries.');
      // Optionally handle this case by redirecting or displaying an error message.
    }
  }


}
