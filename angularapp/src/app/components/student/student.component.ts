import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  isStudent: boolean = true;
  authToken: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.authToken = this.authService.getToken();
  }

}
