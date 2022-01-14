import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new Subject<boolean>()
  isComprador = new Subject<boolean>()

  constructor(
    private http: HttpClient
  ) { }

  /*
  registrarse(user:Comprador): Observable<any> {
    return this.http.post(API_BASE + '/auth/signin', user)
  }

  iniciarSesion(username: string, password: string, es_comprador: boolean): Observable<any> {
    return this.http.post(API_BASE + '/auth/login', {username, password, es_comprador})
  }

  cerrarSesion(): Observable<any> {
    return this.http.post('', {})
  }
  */
}
