import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const API_URL = 'http://localhost:8080/api/v1/notification/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  getAllNotifications(status: Array<String>): Observable<any> {
    let queryString = '?';
    if (status) {
      for (let i = 0; i < status.length; i++) {
        queryString += 'status[' + i + ']=' + status[i] + '&&'
      }
    }
    return this.http.get(API_URL + 'getByStatus' + queryString);
  }

  getAllNotificationCount(status: Array<String>): Observable<any> {
    let queryString = '?';
    if (status) {
      for (let i = 0; i < status.length; i++) {
        queryString += 'status[' + i + ']=' + status[i] + '&&'
      }
    }
    return this.http.get(API_URL + 'getCount' + queryString);
  }

  updateNotificationStatus(updateData: any): Observable<any> {
    return this.http.put(API_URL + 'updateStatus', updateData, httpOptions);
  }
}
