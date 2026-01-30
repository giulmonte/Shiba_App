import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../data.service';

interface Shiba {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  likes: number;
  dislikes: number;
  comments: string[];
  breed?: string;
}

@Component({
  selector: 'app-shiba-breed',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './shiba-breed.component.html',
  styleUrl: './shiba-breed.component.css'      
})
export class ShibaBreedComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  currentBreed: string = '';
  shibas: Shiba[] = [];
  allCards: Shiba[] = [];
  selectedFile: File | null = null;
  
  //IA Ollama
  loadingAnalysis: boolean = false;
  analysisMessage: string = '';
  breedReview: any = null; 

  commentInputs: { [key: number]: string } = {};
  newShiba: Shiba = { title: '', subtitle: '', image: '', description: '', likes: 0, dislikes: 0, comments: [] };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentBreed = params['breed'];
      this.breedReview = null; 
      this.analysisMessage = '';
      this.loadShibasFromFlask();
    });
  }

  loadShibasFromFlask(): void {
    this.dataService.getCards().subscribe({
      next: (data) => {
        this.allCards = data;
        this.shibas = data.filter((s: any) => s.breed === this.currentBreed);
      }
    });
  }

  //LOGICA RECENSIONE DI RAZZA
  getBreedReview(): void {
    this.loadingAnalysis = true;
    this.analysisMessage = `AI: Analisi sentiment e statistiche sulla razza ${this.currentBreed}...`;
    
    this.dataService.getBreedSpecificReview(this.currentBreed).subscribe({
      next: (res) => {
        this.breedReview = res;
        this.loadingAnalysis = false;
        this.analysisMessage = "AI: Report di razza generato con successo!";
      },
      error: () => {
        this.loadingAnalysis = false;
        this.analysisMessage = "Errore: Ollama non risponde.";
      }
    });
  }

  //GESTIONE CARD
  vote(index: number, type: 'like' | 'dislike'): void {
    const shiba = this.shibas[index];
    if (type === 'like') shiba.likes++;
    else shiba.dislikes++;
    this.syncAndSave();
  }

  addComment(index: number): void {
    const txt = this.commentInputs[index];
    if (txt?.trim()) {
      this.shibas[index].comments.push(txt.trim());
      this.commentInputs[index] = '';
      this.syncAndSave();
    }
  }

  deleteShiba(index: number): void {
    const shibaToDelete = this.shibas[index];
    this.allCards = this.allCards.filter(s => s !== shibaToDelete);
    this.dataService.saveCards(this.allCards).subscribe(() => this.loadShibasFromFlask());
  }

  syncAndSave(): void {
    this.dataService.saveCards(this.allCards).subscribe();
  }

  addShiba(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newShiba.image = reader.result as string;
        this.finalizeAddition();
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.finalizeAddition();
    }
  }

  finalizeAddition(): void {
    const entry = { ...this.newShiba, breed: this.currentBreed, likes: 0, dislikes: 0, comments: [] };
    this.allCards.push(entry);
    this.dataService.saveCards(this.allCards).subscribe(() => {
      this.loadShibasFromFlask();
      this.newShiba = { title: '', subtitle: '', image: '', description: '', likes: 0, dislikes: 0, comments: [] };
      this.selectedFile = null;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}