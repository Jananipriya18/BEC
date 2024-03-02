import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public apiUrl = 'https://8080-edadeeddfbdaedbcaafcbfcecefbcbacdebdeecab.premiumproject.examly.io';

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  private getHeaders(): HttpHeaders {
    // const token = this.jwtService.getToken();
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getAllCourses(): Observable<Course[]> {
    const role = localStorage.getItem('userRole');
    console.log(role);

    if (role !== 'STUDENT' && role !== 'student') {
      console.error('Access denied. Only admins can view courses.');
      return;
    }    
    
    const endpoint = `${this.apiUrl}/student/getAllcourses`;
    const authToken = localStorage.getItem('token');
    const headers = authToken ? new HttpHeaders({ 'Authorization': `Bearer ${authToken}` }) : undefined;
    const options = { headers };
    console.log(headers);

    return this.http.get<Course[]>(endpoint, options).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );

  }
  getAllStudents(studentData: any): Observable<any> {
    const role = localStorage.getItem('userRole');
    console.log(role);

    if (role !== 'ADMIN' && role !== 'admin') {
      console.error('Access denied. Only students can make payments.');
      return;
    }

    const endpoint = `${this.apiUrl}/api/student`;
    const authToken = localStorage.getItem('token');
    const headers = authToken ? new HttpHeaders({ 'Authorization': `Bearer ${authToken}` }) : undefined;
    const options = { headers };
    console.log(headers);

    return this.http.get(endpoint, options).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }

  // addCourse(course: Course): Observable<Course> {
  //   // const role = this.jwtService.getUserRole();
  //   const role = localStorage.getItem('userRole');
  //   // const role1 = localStorage.getItem('token');
  //   console.log(role);
    
  //   if (role !== 'ADMIN' && role !== 'admin') {
  //     console.error('Access denied. Only admins can add courses.');
  //     return;
  //   }
  //   const endpoint = `${this.apiUrl}/admin/course/addCourse`;
  //   const authToken = localStorage.getItem('token');
  //   const headers = authToken ? new HttpHeaders({ 'Authorization': `Bearer ${authToken}` }) : undefined;
  //   const options = { headers };
  //   console.log(headers);


  //   return this.http.post<Course>(endpoint, course, options).pipe(
  //     catchError((error) => {
  //       if (error.status === 401) {
  //         console.error('Authentication error: Redirect to login page or handle accordingly.');
  //       }
  //       return throwError(error);
  //     })
  //   );

  //   // return this.http.post(this.apiUrl, course, { headers: this.getHeaders() });
  // }

  // updateCourse(course: Course): Observable<Course> {
  //   // const role = this.jwtService.getUserRole();
  //   const role = localStorage.getItem('userRole');
  //   // const role1 = localStorage.getItem('token');
  //   console.log(role);
    
  //   if (role !== 'ADMIN' && role !== 'admin') {
  //     console.error('Access denied. Only admins can add courses.');
  //     return;
  //   }
  //   const endpoint = `${this.apiUrl}/admin/course/${course.courseID}`;
  //   const authToken = localStorage.getItem('token');
  //   const headers = authToken ? new HttpHeaders({ 'Authorization': `Bearer ${authToken}` }) : undefined;
  //   const options = { headers };
  //   console.log(headers);

  //   return this.http.put<Course>(endpoint, course, options).pipe(
  //     catchError((error) => {
  //       if (error.status === 401) {
  //         console.error('Authentication error: Redirect to login page or handle accordingly.');
  //       }
  //       return throwError(error);
  //     })
  //   );
  // }

  // deleteCourse(course: Course): Observable<Course> {
  //   // const role = this.jwtService.getUserRole();
  //   const role = localStorage.getItem('userRole');
  //   // const role1 = localStorage.getItem('token');
  //   console.log(role);
    
  //   if (role !== 'ADMIN' && role !== 'admin') {
  //     console.error('Access denied. Only admins can add courses.');
  //     return;
  //   }
  //   const endpoint = `${this.apiUrl}/admin/course/${course.courseID}`;
  //   const authToken = localStorage.getItem('token');
  //   const headers = authToken ? new HttpHeaders({ 'Authorization': `Bearer ${authToken}` }) : undefined;
  //   const options = { headers };
  //   console.log(headers);

  //   return this.http.delete<Course>(endpoint, options).pipe(
  //     catchError((error) => {
  //       if (error.status === 401) {
  //         console.error('Authentication error: Redirect to login page or handle accordingly.');
  //       }
  //       return throwError(error);
  //     })
  //   );
  // }
}
