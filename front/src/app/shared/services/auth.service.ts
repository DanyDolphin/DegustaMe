import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_BASE } from '../constants';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuthenticated = new Subject<boolean>()


  constructor(
    private http: HttpClient
  ) { }


  registrarse(user:any): Observable<any> {
    return this.http.post(`${API_BASE}/auth/signin`, user);
  }


  iniciarSesion(user:any): Observable<any> {
    return this.http.post(`${API_BASE}/auth/login`, user)
  }

  /*
  cerrarSesion(): Observable<any> {
    return this.http.post('', {})
  }
  */
  obtenPerfil(): Observable<any> {
    return this.http.get(`${API_BASE}/auth/perfil`)
  }
}
