import { Injectable } from '@angular/core'; //allows angular to manage and share this service across different components
import { HttpClient } from '@angular/common/http'; // lets us make HTTP requests
import { Observable } from 'rxjs'; //observable is like a promise; allows us to wait for the API response before doing something

@Injectable({
  providedIn: 'root' // makes service available across whole app; can 'inject' the service into components
})
export class DataService {
  private baseUrl = '/api/data'; // URL of the API endpoint
  
  constructor(private http: HttpClient) { } // this injects HttpClient into the service; this lets you use this.http.get() to make API requests

  // this functions makes a GET request to the API and returns the data as an Observable
  getData(location: string): Observable<any> {
    const url = `${this.baseUrl}/${location.toLowerCase()}`;
    return this.http.get<any>(url);
  }
}
