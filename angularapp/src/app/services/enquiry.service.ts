import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { Enquiry } from 'src/app/models/enquiry.model';
import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  public apiUrl = 'https://8080-edadeeddfbdaedbcaafcbfcecefbcbacdebdeecab.premiumproject.examly.io';

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }
  getEnquiriesByUser(userId: string): Observable<Enquiry[]> {
    const endpoint = `${this.apiUrl}/api/user/${userId}`;
    const headers = this.getHeaders();
    return this.http.get<Enquiry[]>(endpoint, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }

  getEnquiryByAdmin(enquiryId: number): Observable<Enquiry> {
    const endpoint = `${this.apiUrl}/api/enquiry/${enquiryId}`;
    const headers = this.getHeaders();
    return this.http.get<Enquiry>(endpoint, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }

  getAllEnquiriesByAdmin(): Observable<Enquiry[]> {
    const endpoint = `${this.apiUrl}/api/enquiry`;
    const headers = this.getHeaders();
    return this.http.get<Enquiry[]>(endpoint, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }
  
  getAllEnquiries(): Observable<Enquiry[]> {
    const role = localStorage.getItem('userRole');
    console.log(role);

    let endpoint;
    if (role === 'ADMIN' || role === 'admin') {
      endpoint = `${this.apiUrl}/api/enquiry`;
    } else if (role === 'STUDENT' || role === 'student') {
      endpoint = `${this.apiUrl}/api/enquiry`;
    } else {
      console.error('Access denied. Invalid role.');
      return;
    }
    
    const authToken = localStorage.getItem('token');
    const headers = authToken ? new HttpHeaders({ 'Authorization': `Bearer ${authToken}` }) : undefined;
    const options = { headers };
    console.log(headers);

    return this.http.get<Enquiry[]>(endpoint, options).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }
  
  addEnquiry(enquiry: Enquiry): Observable<Enquiry> {
    const role = localStorage.getItem('userRole');
    console.log(role);
    
    if (role !== 'STUDENT' && role !== 'student') {
      console.error('Access denied. Only students can add enquiries.');
      return;
    }
    const endpoint = `${this.apiUrl}/api/enquiry`;
    const authToken = localStorage.getItem('token');
    const headers = authToken ? new HttpHeaders({ 'Authorization': `Bearer ${authToken}` }) : undefined;
    const options = { headers };
    console.log(headers);

    return this.http.post<Enquiry>(endpoint, enquiry, options).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }

  updateEnquiry(Id: string, newStatus: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Assuming your token is a bearer token, replace it accordingly
    });
    console.log("Before Status -"+newStatus);
    return this.http.put(`${this.apiUrl}/api/enquiry/${Id}/status?status=${newStatus}`, { status: newStatus });
}

  deleteEnquiry(enquiry: Enquiry): Observable<Enquiry> {
    const role = localStorage.getItem('userRole');
    console.log(role);
    
    if (role !== 'STUDENT' && role !== 'student') {
      console.error('Access denied. Only students can delete enquiries.');
      return;
    }
    const endpoint = `${this.apiUrl}/api/enquiry/${enquiry.enquiryID}`;
    const authToken = localStorage.getItem('token');
    const headers = authToken ? new HttpHeaders({ 'Authorization': `Bearer ${authToken}` }) : undefined;
    const options = { headers };
    console.log(headers);

    return this.http.delete<Enquiry>(endpoint, options).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Authentication error: Redirect to login page or handle accordingly.');
        }
        return throwError(error);
      })
    );
  }
}
