import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public apiUrl = 'https://8080-edadeeddfbdaedbcaafcbfcecefbcbacdebdeecab.premiumproject.examly.io';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });
  }

  getAllCourses(): Observable<Course[]> {
    const endpoint = `${this.apiUrl}/api/course`;
    const headers = this.getHeaders();

    return this.http.get<Course[]>(endpoint, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }

  saveCourseByAdmin(course: Course): Observable<Course> {
    const endpoint = `${this.apiUrl}/api/course`;
    const headers = this.getHeaders();

    return this.http.post<Course>(endpoint, course, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }

  updateCourseByAdmin(courseId: number, updatedCourseData: Course): Observable<Course> {
    const endpoint = `${this.apiUrl}/api/course/${courseId}`;
    const headers = this.getHeaders();

    return this.http.put<Course>(endpoint, updatedCourseData, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }

  deleteCourseByAdmin(courseId: number): Observable<Course> {
    const endpoint = `${this.apiUrl}/api/course/${courseId}`;
    const headers = this.getHeaders();

    return this.http.delete<Course>(endpoint, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }

  getStudentCourses(): Observable<Course[]> {
    const endpoint = `${this.apiUrl}/api/student/course`;
    const headers = this.getHeaders();

    return this.http.get<Course[]>(endpoint, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }
}