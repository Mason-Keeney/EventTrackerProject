import { UserMedication } from 'src/app/models/user-medication';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserMedicationService {
  private url = environment.baseUrl + "api/";

  constructor(
    private http: HttpClient
  ) {}

  index(user: User | null): Observable<UserMedication[]>{
    if(user){
      return this.http.get<UserMedication[]>(this.url + "users/" + user.id + "/usermedications").pipe(
        catchError((err) =>{
          console.log(err);
          return throwError(
            () => new Error("UserMedicationService.index(): error retrieving UserMedications: " + err)
            );
          })
          );
        } else{
          return throwError(
            () => new Error("UserMedicationService.index(): no user sent")
          );
        }
      }

      create(userId: number, userMed: UserMedication): Observable<UserMedication>{
        return this.http.post<UserMedication>(this.url + "users/" + userId + "/usermedications", userMed).pipe(
          catchError((err) =>{
            console.log(err);
            return throwError(
              () => new Error("UserMedicationService.create(): error creating userMed: " + err)
            )
          })
        )
      }

      update(id: number, userMed: UserMedication): Observable<UserMedication> {
       return this.http.put<UserMedication>(this.url + "usermedications/" + id, userMed).pipe(
        catchError((err) =>{
          console.log(err);
          return throwError(
            () => new Error("UserMedicationService.update(): error updating userMed: " + err)
          )
        })
       )
      }

      destroy(id: number): Observable<void>{
        return this.http.delete<void>(this.url + 'usermedications/' + id).pipe(
          catchError((err) => {
            console.log(err);
            return throwError(
              () => new Error("UserMedicationService.destroy(): error deleting userMed: " + err)
            )
          })
        );
      }
}
