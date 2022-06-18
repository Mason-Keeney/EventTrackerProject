import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.baseUrl + "api/users";

  constructor(
    private http: HttpClient
  ) {}

  index(): Observable<User[]>{
    return this.http.get<User[]>(this.url).pipe(
      catchError((err) =>{
        console.log(err);
        return throwError(
          () => new Error("UserService.index(): error retrieving users: " + err)
        );
      })
    );
  }


  login(username: string, password: string): Observable<User>{
    return this.http.get<User>(this.url + '/login/' + username + "/" + password).pipe(
      catchError((err) =>{
        console.log(err);
        return throwError(
          () => new Error("UserService.login(): error retrieving user: " + err)
        );
      })
    );
  }

  create(user: User): Observable<User>{
    return this.http.post<User>(this.url, user).pipe(
      catchError((err) =>{
        console.log(err);
        return throwError(
          () => new Error("UserService.create(): error creating user: " + err)
        )
      })
    )
  }

  update(id: number, user: User): Observable<User> {
   return this.http.put<User>(this.url + "/" + id, user).pipe(
    catchError((err) =>{
      console.log(err);
      return throwError(
        () => new Error("UserService.update(): error updating user: " + err)
      )
    })
   )
  }

  destroy(id: number): Observable<void>{
    return this.http.delete<void>(this.url + '/' + id).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(
          () => new Error("UserService.destroy(): error deleting user: " + err)
        )
      })
    );
  }
}
