import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  constructor(
    private http: HttpClient
  ) { }

  obtenRecetas() {
    return this.http.get(`${API_BASE}/recetas/`)
  }

  obtenReceta(id: string) {
    return this.http.get(`${API_BASE}/recetas/${id}`)
  }

  buscarRecetas(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_BASE}/recetas/search/${encodeURIComponent(query)}`)
  }

  obtenRecomendaciones() {
    return this.http.get(`${API_BASE}/recetas/recomendaciones/`)
  }

  obtenSeguimientoRecetas() {
    return this.http.get<any>(`${API_BASE}/recetas/seguimiento/`)
  }

  eliminarSeguimientoReceta(id: string): Observable<any> {
    return this.http.delete(`${API_BASE}/productos/${id}`)
  }
}