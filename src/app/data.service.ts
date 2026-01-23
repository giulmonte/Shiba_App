import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly FLASK_URL = 'http://localhost:5000/api'; 
  private http = inject(HttpClient);

  // --- GESTIONE ADOZIONI ---
  salvaAdozione(dati: any): Observable<any> {
    return this.http.post(`${this.FLASK_URL}/adozioni`, dati);
  }

  getAdozioni(): Observable<any[]> {
    return this.http.get<any[]>(`${this.FLASK_URL}/adozioni`);
  }

  // --- GESTIONE CARD ---
  getCards(): Observable<any[]> {
    return this.http.get<any[]>(`${this.FLASK_URL}/cards`);
  }

  saveCards(cards: any[]): Observable<any> {
    return this.http.post(`${this.FLASK_URL}/cards`, cards);
  }

  analyzeImage(imageBase64: string, filename: string): Observable<any> {
    const payload = {
      image_base64: imageBase64,
      filename: filename
    };
    return this.http.post(`${this.FLASK_URL}/analyzeImage`, payload); 
  }

  // --- AI (OLLAMA) ---
  populateExistingComments(): Observable<any> {
    return this.http.post(`${this.FLASK_URL}/ai/populate-existing`, {});
  }

  generateAIComment(title: string, description: string): Observable<{comment: string}> {
    return this.http.post<{comment: string}>(`${this.FLASK_URL}/ai/generate-comment`, { 
      title, 
      description 
    });
  }

  // -- RECENSIONE GENERALE DEL SITO --
  getAISiteReview(): Observable<{review: string}> {
    return this.http.get<{review: string}>(`${this.FLASK_URL}/ai/site-review`);
  }

  // --- UTILITY ---
  checkStatus(): Observable<any> {
    return this.http.get(`${this.FLASK_URL}/checkStatus`);
  }
}