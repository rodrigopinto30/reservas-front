import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  private API_URL = "http://localhost:8000/api/space";
  private tokenkey = 'authtoken';

  constructor(private http: HttpClient, private router: Router) { }

  getSpaces(): Observable<any[]>{
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content.Type': 'application/json'
    });

    return this.http.get<any[]>(`${this.API_URL}/lastSpace`, {headers});
  }

  getAllSpace(): Observable<any[]>{
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content.Type': 'application/json'
    });

    return this.http.get<any[]>(this.API_URL, {headers});
  } 

  getSpace(id: number): Observable<any[]> {
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(`${this.API_URL}/${id}`, {headers});
  }

  updateSpace(space: any): Observable<any[]> {
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    return this.http.put<any[]>(this.API_URL, space,{headers}).pipe(
      tap(response => {
        if(response){
          this.router.navigate(['/space']);
        }
      })
    );
  }

  deleteSpace(id:number): Observable<any[]>{
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    return this.http.delete<any[]>(`${this.API_URL}/${id}`, {headers}).pipe();
  }
}
