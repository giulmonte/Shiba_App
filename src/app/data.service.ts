import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly FLASK_URL = 'http://localhost:5000/api'; 
  private http = inject(HttpClient);

  // GESTIONE ADOZIONI 
  salvaAdozione(dati: any): Observable<any> {
    return this.http.post(`${this.FLASK_URL}/adozioni`, dati);
  }

  getAdozioni(): Observable<any[]> {
    return this.http.get<any[]>(`${this.FLASK_URL}/adozioni`);
  }

  // GESTIONE CARD
  getCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.FLASK_URL}/cards`);
  }

  saveCards(cards: any[]): Observable<any> {
    return this.http.post(`${this.FLASK_URL}/cards`, cards);
  }

  // AI (OLLAMA)
  populateExistingComments(): Observable<any> {
    return this.http.post(`${this.FLASK_URL}/ai/populate-existing`, {});
  }

  // RECENSIONE GENERALE DEL SITO (Quella che mancava nell'errore)
  getAISiteReview(): Observable<any> {
    return this.http.get<any>(`${this.FLASK_URL}/ai/site-review`);
  }

  // RECENSIONE SPECIFICA PER RAZZA
  getBreedSpecificReview(breed: string): Observable<any> {
    return this.http.get<any>(`${this.FLASK_URL}/ai/breed-review/${breed}`);
  }
}