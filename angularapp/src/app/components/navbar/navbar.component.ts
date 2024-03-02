import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isStudent: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
      if (this.isLoggedIn) {
        // Wait for the role information before setting flags
        this.authService.getUserRole().subscribe((role) => {
          this.isAdmin = this.authService.isAdmin();
          this.isStudent = this.authService.isStudent();
        });
      } else {
        this.isAdmin = false;
        this.isStudent = false;
      }
    });
  }

  ngOnInit(): void {
    // Initialize the properties on component initialization
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      // Wait for the role information before setting flags
      this.authService.getUserRole().subscribe((role) => {
        this.isAdmin = this.authService.isAdmin();
        this.isStudent = this.authService.isStudent();
      });
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isStudent = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}