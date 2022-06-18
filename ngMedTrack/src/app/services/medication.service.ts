import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medication } from '../models/medication';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  private url = environment.baseUrl + "api/medications";
  constructor(private http: HttpClient) { }

  index(): Observable<Medication[]>{
    return this.http.get<Medication[]>(this.url).pipe(
      catchError((err) =>{
        console.log(err);
        return throwError(
          () => new Error("UserService.index(): error retrieving users: " + err)
        );
      })
    );
  }
}
