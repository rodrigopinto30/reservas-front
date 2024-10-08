import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { SwitchService } from '../../functions/switch/switch.service'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = "http://localhost:8000/api/auth/login";
  private tokenKey = "authtoken";
  private REGISTER_URL = "http://localhost:8000/api/auth/register";

  constructor(private httpClient: HttpClient, private router: Router, private switchService: SwitchService) { }

  login(email: string, password: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(this.LOGIN_URL, { email, password }, { headers }).pipe(
      tap(response => {
        if (response.access_token) {
          const userData = {
            name: response.user.name,
            lastName: response.user.lastName,
            email: response.user.email,
            rol: response.user.rol
          };
          this.setUserData(userData);
          this.setToken(response.access_token)
        }
      })
    );
  }

  private setUserData(userData: any): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey)
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  register(name: string, lastName: string, email: string, password: string, password_confirmation: string, rol: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.httpClient.post<any>(this.REGISTER_URL, { name, lastName, email, password, password_confirmation, rol }, { headers }).pipe(
      tap(response => {
        if (response) {
          this.switchService.$modalSuccess.emit("Registro exitoso, por favor inicie sesión");
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
