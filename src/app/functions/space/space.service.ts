import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  private API_URL = "http://localhost:8000/api/space";
  private tokenkey = 'authtoken';

  constructor(private http: HttpClient) { }

  getSpaces(): Observable<any[]>{

    const token = localStorage.getItem(this.tokenkey);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content.Type': 'application/json'
    });

    return this.http.get<any[]>(this.API_URL, {headers});
  }
}
