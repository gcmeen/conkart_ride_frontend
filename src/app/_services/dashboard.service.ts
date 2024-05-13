import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'https://conkart-ride-backend.onrender.com/api/v1/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardDetails(): Observable<any> {
    return this.http.get(API_URL);
  }
}
