import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isAdmin: boolean = true;
  authToken: string | null = null;

  // constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.authToken = this.authService.getToken();
  }


}
