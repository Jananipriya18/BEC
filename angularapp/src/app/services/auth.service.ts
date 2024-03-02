import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;
  public apiUrl = 'https://8080-aabdbffdadabafcfdbcfacbdcbaeadbebabcdebdca.premiumproject.examly.io'; 
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$: Observable<string> = this.userRoleSubject.asObservable();
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('currentUser')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

 register(userName: string, password: string, userRole: string, emailID: string, mobileNumber:string): Observable<any> {
    const body = { userName, password, userRole, emailID, mobileNumber };
    console.log(body);

    return this.http.post<any>(`${this.apiUrl}/auth/register`, body).pipe(
      tap((user) => this.storeUserData(user)),
    //   catchError(this.handleError<any>('register'))
    // );
    catchError(error => {
      // If registration fails due to duplicate email, return the error message to the component
      if (error.error === "User with that Email already exists") {
        return of(error.error); // Return the error message
      }
      // Otherwise, handle other errors or rethrow the error
      return throwError(error);
    })
  );
  }

  isLoggedIn(): boolean {
    // Check if the user token exists in localStorage
    console.log(localStorage.getItem('token'));

    return !!localStorage.getItem('token');
  }

  getUserRole(): Observable<string> {
    return this.userRole$;
  }

  // logout(): void {
  //   // Clear the user data from localStorage
  //   localStorage.removeItem('userToken');
  //   localStorage.removeItem('userRole');
  // }

  private storeUserData(user: any): void {
    // Save the user token and role in localStorage
    localStorage.setItem('userToken', user.token);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('user', user.userId);
    console.log('The userID'+localStorage.getItem('user'));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Handle the error (you can log it or perform other actions)
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(emailID: string, password: string): Observable<any> {
    const loginData = { emailID, password };
    console.log(loginData);
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        tap(response => {
          console.log(response);

          

          // Store the token in localStorage or a more secure storage method
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', response.username);
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('user', response.userId);
          //console.log('The userID'+localStorage.getItem('currentUser'));
          

          this.userRoleSubject.next(response.role);
          this.isAuthenticatedSubject.next(true); // Notify observers that the user is authenticated


        })
      );
  }

  logout(): void {
    // Remove the token from storage upon logout
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    localStorage.removeItem('email');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated by verifying the token
    const token = localStorage.getItem('token');
    console.log(token);

    return !!token; // Return true if the token exists
  }

  isAdmin(): boolean {
    // Check if the user has the 'admin' role based on your token structure
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (token) {
      // console.log("token:"+token);
      if(role === 'admin' || role === 'ADMIN'){
        return true;
      }

      // Decode the token and check if it contains the 'admin' role
      const decodedToken = this.decodeToken(token);
      // console.log("dummy"+decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

      return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin';
    }
    return false; // Return false if the token is not present or doesn't have 'admin' role
  }

  isStudent(): boolean {
    // Check if the user has the 'admin' role based on your token structure
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token) {
      // console.log("token:asd"+token);
      if(role === 'student' || role === 'STUDENT'){
        return true;
      }

      // Decode the token and check if it contains the 'admin' role
      const decodedToken = this.decodeToken(token);
      const uname = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      // console.log("dummy"+decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      if(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'student')
      return true;
     // else  return true && uname;
    }
    return false; // Return false if the token is not present or doesn't have 'admin' role
  }

  // getCustomerName(): string {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decodedToken = this.decodeToken(token);
  //     const uname = localStorage.getItem('currentUser');
  //     return uname; // Return the customer's name
  //   }
  //   return ''; // Return an empty string if the token is not present
  // }







  private decodeToken(token: string): any {
    // You can use a library like jwt-decode to decode JWT tokens
    // Example: return jwt_decode(token);
    // For simplicity, you can parse the token as JSON (not recommended for production)
    try {
      // console.log("decode"+token);
      var decode = JSON.parse(atob(token.split('.')[1]));
      // console.log(decode.sub);
      // console.log();
      localStorage.setItem('email', decode.sub);

      console.log(decode['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);

      return decode
    } catch (error) {
      return null;
    }
  }
}