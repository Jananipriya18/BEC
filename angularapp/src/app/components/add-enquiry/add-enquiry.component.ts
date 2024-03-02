import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../../services/enquiry.service';
import { Enquiry } from 'src/app/models/enquiry.model';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-enquiry',
  templateUrl: './add-enquiry.component.html',
  styleUrls: ['./add-enquiry.component.css']
})
export class AddEnquiryComponent implements OnInit {
  enquiry: Enquiry = new Enquiry();
  courses: any = [];
  enquiryDate: Date; // Define the property
  userId: string; // Initialize userId with a sample value
  status: string = 'Pending';
  enquiryCount: number = 0; // Counter to track the number of enquiries

  constructor(private enquiryService: EnquiryService, private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCourses();
    this.enquiryDate = new Date(); // Set the current date
    this.userId = localStorage.getItem('user');
  }

  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses.map(course => course.courseName);
      console.log(courses);
    });
  }

  addEnquiry(): void {
    if (this.enquiryCount >= 5) {
      alert('You have reached the maximum number of enquiries for today.');
      // Optionally, disable the button here
      return;
    }

    this.enquiry.userId = this.userId;
    this.enquiry.status = 'Pending';
    console.log('Enquiry Details:', this.enquiry); // Displaying the enquiry model values

    this.enquiryService.addEnquiry(this.enquiry).subscribe(() => {
      console.log('Enquiry added successfully'+this.enquiryCount);
      this.enquiryCount++; // Increment the enquiry count
      // Display alert message
      if (this.enquiryCount === 2) {
        alert('You have added 5 enquiries today. Further enquiries will be disabled.');
        // Optionally, disable the button here
      } else {
        alert('Enquiry added successfully!');
      }
      this.router.navigate(['myenquiry/view']);
      this.enquiry = new Enquiry(); // clear the form
    });
  }

  getCurrentDate(): Date {
    return this.enquiryDate;
  }
}
