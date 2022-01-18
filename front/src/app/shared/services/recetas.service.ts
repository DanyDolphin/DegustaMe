import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  buscarRecetas(query: string) {
    return this.http.get(`${API_BASE}/recetas/search/${encodeURIComponent(query)}`)
  }

  obtenRecomendaciones() {
    return this.http.get(`${API_BASE}/recetas/recomendaciones/`)
  }
}
