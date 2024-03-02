import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  public tokenKey = 'jwtToken';

  constructor() {}

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.decodeToken(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  decodeToken(token: string): void {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
  }

  getUserRole(): string {
    const token = this.getToken();
    if (!token) return '';
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
}