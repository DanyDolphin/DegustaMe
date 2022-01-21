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

  obtenCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${API_BASE}/recetas/categorias`)
  }

  obtenSeguimientoRecetas() {
    return this.http.get<any>(`${API_BASE}/recetas/seguimiento`)
  }

  agregarSeguimientoReceta(id: string): Observable<any> {
    return this.http.post(`${API_BASE}/recetas/seguimiento/agrega/${id}`,{})
  }

  verificaSeguimientoReceta(id: string): Observable<any> {
    return this.http.get(`${API_BASE}/recetas/seguimiento/verifica/${id}`,{})
  }

  eliminarSeguimientoReceta(id: string): Observable<any> {
    return this.http.delete(`${API_BASE}/recetas/${id}`)
  }

  agregaReceta( receta: any ): Observable<any> {
    console.log("Haciendo petición de agregar receta")
    return this.http.post(`${API_BASE}/recetas/agrega`, receta);
  }

  eliminarReceta( id: string ): Observable<any> {
    return this.http.delete(`${API_BASE}/recetas/elimina/${id}`);
  }

  obtenMisRecetas() {
    return this.http.get<any>(`${API_BASE}/recetas/misrecetas`)
  }
  
}