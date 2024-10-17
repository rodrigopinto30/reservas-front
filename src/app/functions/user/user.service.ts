import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = "http://localhost:8000/api/user";
  private tokenkey = 'authtoken';

  constructor(private http: HttpClient, private router: Router) { }

  lastUser(): Observable<any[]>{
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content.Type': 'application/json'
    });
    return this.http.get<any[]>(`${this.API_URL}/lastUser`, {headers});
  }

  allUser(): Observable<any[]>{
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content.Type': 'application/json'
    });
    return this.http.get<any[]>(this.API_URL, {headers});
  }

  getUser(id: number): Observable<any[]>{
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content.Type': 'application/json'
    });
    return this.http.get<any[]>(`${this.API_URL}/${id}`, {headers});
  }

  updateUser(user: any): Observable<any[]> {
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any[]>(this.API_URL, user,{headers}).pipe(
      tap(response => {
        if(response){
          this.router.navigate(['/user']);
        }
      })
    );
  }

  deleteUser(id:number): Observable<any[]> {
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete<any[]>(`${this.API_URL}/${id}`, {headers}).pipe();
  }
}
