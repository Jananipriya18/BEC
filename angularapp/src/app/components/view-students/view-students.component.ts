import { Component, OnInit } from '@angular/core';
import { StudentService} from 'src/app/services/student.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit {
  [x: string]: any;
  students: any[];
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    const studentData = {}; // Add your payment data here
    this.studentService.getAllStudents(studentData).subscribe((students: any[]) => { 
      this.students = students;
    });
  }

}
