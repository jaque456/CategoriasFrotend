import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tipo } from '@app/shared/models/tipo.interface';
import { UserResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  lista(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${environment.URL_API}/categoria`)
      .pipe(catchError((err) => this.handleError(err)));
  }

  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${environment.URL_API}/Tipos/Tipos`).
    pipe(catchError((error) => 
      this.handleError(error)));
  }

  getById(): void {}

  new(user: UserResponse): Observable<any> {
    return this.http.put<any>(`${environment.URL_API}/categorias`, user)
    .pipe(catchError((error) => this.handleError(error)));
  }

  update(): void {}
  private handleError(err: any): Observable<never> {
    let errorMessage = "Ocurrio un error";

    if(err){
      errorMessage = `Error: ${ typeof err.error.message == 'undefined' ? err.message : err.error.message }`;
      this._snackBar.open(errorMessage, '', {
        duration: 6000
      });
    }
    return throwError(errorMessage);
  }
}

