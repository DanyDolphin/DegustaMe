import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuthenticated = new Subject<boolean>()


  constructor(
    private http: HttpClient
  ) { }


  registrarse(user:any): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/auth/signin', user);
  }


  iniciarSesion(user:any): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/auth/login', user)
  }

  /*
  cerrarSesion(): Observable<any> {
    return this.http.post('', {})
  }
  */
}
