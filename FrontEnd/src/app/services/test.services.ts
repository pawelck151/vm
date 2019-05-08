import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TestService {
   constructor(private http: HttpClient) { }
   getBaseUrl() {
      return 'http://localhost:5000/';
   }
   getTestMessage(): Observable<string> {
      const headers = new HttpHeaders({ 'Content-Type': 'text/plain'});
      return this.http.get('api/values', {responseType: 'text', headers});
   }
}
