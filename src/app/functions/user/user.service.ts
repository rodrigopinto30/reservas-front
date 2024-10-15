import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = "http://localhost:8000/api/user";
  private tokenkey = 'authtoken';

  constructor(private http: HttpClient) { }

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

}
