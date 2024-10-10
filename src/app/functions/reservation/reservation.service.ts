import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private API_URL = "http://localhost:8000/api/reservation";
  private API_URL_ACTIVE = "http://localhost:8000/api/reservation/active";
  private API_URL_FINISHED = "http://localhost:8000/api/reservation/finished";
  private tokenkey = 'authtoken';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any[]>{

    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content.Type': 'application/json'
    });

    return this.http.get<any[]>(this.API_URL, {headers});
  }

  getActiveReservations(): Observable<any[]> {
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<any[]>(this.API_URL_ACTIVE, { headers });  
  }

  getFinishedReservations(): Observable<any[]> {
    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<any[]>(this.API_URL_FINISHED, { headers });  
  }
}
