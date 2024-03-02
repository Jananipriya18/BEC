import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from 'src/app/models/course.model';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  courses: Course[];
  selectedCourse: Course;
  userRole: string;

  constructor(private courseService: CourseService, private paymentService: PaymentService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCourses();
    this.userRole = localStorage.getItem('userRole'); // get the user's role from local storage
  }

  getAllCourses(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      console.log(courses);
    });
  }

  editCourse(course: Course): void {
    if (this.userRole !== 'ADMIN') {
      console.error('Access denied. Only admins can edit courses.');
      return;
    }

    this.selectedCourse = course;
  }

  deleteCourse(course: Course): void {
    if (this.userRole !== 'ADMIN') {
      console.error('Access denied. Only admins can delete courses.');
      return;
    }

    this.courseService.deleteCourseByAdmin(course.courseID).subscribe(() => {
      this.getAllCourses(); // refresh the list after deleting
    });
  }

  updateCourse(course: Course): void {
    if (this.userRole !== 'ADMIN') {
      console.error('Access denied. Only admins can update courses.');
      return;
    }

    this.courseService.updateCourseByAdmin(course.courseID, course).subscribe(() => {
      this.getAllCourses(); // refresh the list after updating
      this.selectedCourse = null; // clear the selection
    });
  }

  cancelEdit(): void {
    this.selectedCourse = null; // clear the selection
  }

  makePayment(course: Course): void {
    this.router.navigate(['/payment/make'], { queryParams: { ...course } });
    console.log(course);
  }

}
