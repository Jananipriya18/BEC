// add-course.component.ts
import { Component } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from '../../services/course.service';
import { NgForm } from '@angular/forms';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent  {
  userRole: string;
  courses: Course[] = [];
  newCourse: Course = {
    courseID: 0,
    courseName: '',
    description: '',
    duration: '',
    cost: 0
  };
  showCourseId: boolean = true; // Flag to show/hide the courseID input field

  constructor(private courseService: CourseService, private jwtService: JwtService, private router: Router) {
    this.userRole = this.jwtService.getUserRole();
    // Set the flag based on the user's role
    if (this.userRole === 'ADMIN') {
      this.showCourseId = true; // Show the courseID input field for admins
    } else {
      this.showCourseId = false; // Hide the courseID input field for other users
    }
  }
 
  addCourse(form: NgForm): void {
    if (form.valid) {
      console.log(this.newCourse);
  
      this.courseService.saveCourseByAdmin(this.newCourse).subscribe(
        (course) => {
          this.courses.push(course);
          this.newCourse = { courseID: 0, courseName: '', description: '', duration: '', cost: 0 };
          
          // Display alert message
          alert('Course added successfully!');
          this.router.navigate(['/courses/view'])
        },
        (error) => {
          console.error('Error adding course:', error); // Log error
        }
      );
    }
  }
}
