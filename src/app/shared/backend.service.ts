import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Textile } from './textile';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  baseUrl = 'http://localhost:3000/textiles';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Textile[]>{
    return this.http.get<Textile[]>(this.baseUrl);
  }

  getOne(id: string): Observable<Textile>{
    return this.http.get<Textile>(this.baseUrl + '/' + id);
  }

  update(id: string, data: Textile): Observable<Textile> {
    return this.http.patch<Textile>(this.baseUrl + '/' + id, data);
  }

  

create(data: Textile): Observable<Textile> {
  // Check if the mandatory fields are present
  if (!data.category) {
    throw new Error('Category is required.');
  }
  
  // Add additional checks for other mandatory fields, if any

  // If all mandatory fields are present, submit the form
  return this.http.post<Textile>(this.baseUrl + '/', data);
}



  deleteOne(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrl + '/' + id, {observe: 'response'});
  }     
}
