import { Component, OnInit, inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

interface Shiba {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  likes: number;
  dislikes: number;
  comments: string[];
}

@Component({
  selector: 'app-prova',
  standalone: true,
  imports: [MatSlideToggleModule, MatCardModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './prova.component.html',
  styleUrl: './prova.component.css'
})
export class ProvaComponent implements OnInit {
  private dataService = inject(DataService);

  shibas: Shiba[] = [];
  selectedFile: File | null = null;
  loadingAnalysis: boolean = false;
  analysisMessage: string = '';
  latestReview: any = null; 
  commentInputs: { [key: number]: string } = {};

  newShiba: Shiba = { title: '', subtitle: '', image: '', description: '', likes: 0, dislikes: 0, comments: [] };

  ngOnInit(): void { 
    this.loadShibasFromFlask(); 
  }

  loadShibasFromFlask(): void {
    this.dataService.getCards().subscribe({
      next: (data) => this.shibas = data,
      error: () => this.analysisMessage = 'Errore caricamento dati dal server.'
    });
  }

  saveShibasToFlask(): void {
    this.dataService.saveCards(this.shibas).subscribe({
      next: () => console.log('Database sincronizzato'),
      error: () => this.analysisMessage = 'Errore di sincronizzazione server.'
    });
  }

  // --- 3. NUOVA LOGICA: GENERAZIONE COMMENTI (NON SOVRASCRIVE) ---
  generateAllComments(): void {
    this.loadingAnalysis = true;
    this.analysisMessage = "IA: Elaborazione in corso... Ollama sta analizzando le card.";
    
    this.dataService.populateExistingComments().subscribe({
      next: (res) => {
        this.analysisMessage = "IA: " + res.message;
        this.loadingAnalysis = false;
        
        // Ricarichiamo i dati: se Flask ha usato .append(), vedremo i vecchi + i nuovi
        this.loadShibasFromFlask();
      },
      error: () => { 
        this.loadingAnalysis = false; 
        this.analysisMessage = "Errore: Ollama non risponde."; 
      }
    });
  }

  getGeneralReview(): void {
    this.loadingAnalysis = true;
    this.analysisMessage = "IA: Analisi statistiche e sentiment dei commenti...";
    this.dataService.getAISiteReview().subscribe({
      next: (res) => {
        this.latestReview = res;
        this.loadingAnalysis = false;
        this.analysisMessage = "IA: Report globale generato!";
      },
      error: () => {
        this.loadingAnalysis = false;
        this.analysisMessage = "Errore durante il report.";
      }
    });
  }

  // --- LOGICA VOTI E COMMENTI MANUALI ---
  vote(index: number, type: 'like' | 'dislike'): void {
    if (type === 'like') {
      this.shibas[index].likes = (this.shibas[index].likes || 0) + 1;
    } else {
      this.shibas[index].dislikes = (this.shibas[index].dislikes || 0) + 1;
    }
    this.saveShibasToFlask();
  }

  addComment(index: number): void {
    const txt = this.commentInputs[index];
    if (txt && txt.trim()) {
      if (!this.shibas[index].comments) this.shibas[index].comments = [];
      this.shibas[index].comments.push(txt.trim());
      this.saveShibasToFlask();
      this.commentInputs[index] = '';
    }
  }

  deleteShiba(index: number): void {
    this.shibas.splice(index, 1);
    this.saveShibasToFlask();
  }

  // --- AGGIUNTA NUOVA CARD ---
  addShiba(): void {
    if (this.selectedFile) {
      this.analyzeAndAddShiba();
    } else {
      this.finalizeShibaAddition();
    }
  }

  analyzeAndAddShiba(): void {
    this.loadingAnalysis = true;
    this.analysisMessage = "Analisi immagine in corso...";
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      this.dataService.analyzeImage(base64, this.selectedFile!.name).subscribe({
        next: (res) => {
          this.newShiba.image = reader.result as string;
          this.finalizeShibaAddition();
        },
        error: () => {
          this.loadingAnalysis = false;
          this.analysisMessage = "Errore analisi immagine.";
        }
      });
    };
    reader.readAsDataURL(this.selectedFile!);
  }

  finalizeShibaAddition(): void {
    this.shibas.push({...this.newShiba, likes: 0, dislikes: 0, comments: []});
    this.saveShibasToFlask();
    this.newShiba = { title: '', subtitle: '', image: '', description: '', likes: 0, dislikes: 0, comments: [] };
    this.selectedFile = null;
    this.loadingAnalysis = false;
    this.analysisMessage = "Card aggiunta correttamente!";
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}