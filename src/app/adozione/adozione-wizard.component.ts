import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { DataService } from '../data.service'; 

@Component({
  selector: 'app-adozione-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <section class="wizard-container">
      
      <div class="intro-section" *ngIf="step === 1">
        <div class="accent-bar"></div>
        <h2 class="intro-title">Trova il tuo compagno di vita 🐕</h2>
        <p class="intro-text">
          Adottare uno <strong>Shiba-Inu</strong> non è solo accogliere un cane, ma abbracciare una filosofia di vita fatta di lealtà, dignità e amore incondizionato. 
        </p>
      </div>

      <h1>Adozione Shiba-Inu</h1>
      <p class="step-subtitle">Completa i passaggi per inviare la tua richiesta al nostro server.</p>

      <div class="steps-indicator">
        <div [class.active]="step >= 1">1. Dati personali</div>
        <div [class.active]="step >= 2">2. Preferenze Shiba</div>
        <div [class.active]="step >= 3">3. Riepilogo</div>
      </div>

      <form *ngIf="step === 1" [formGroup]="formStep1" class="step-form">
        <label>
          Nome
          <input type="text" formControlName="nome" placeholder="Inserisci il tuo nome">
        </label>
        <div class="error" *ngIf="formStep1.get('nome')?.invalid && formStep1.get('nome')?.touched">
          Il nome è obbligatorio.
        </div>

        <label>
          Email
          <input type="email" formControlName="email" placeholder="esempio@email.it">
        </label>
        <div class="error" *ngIf="formStep1.get('email')?.invalid && formStep1.get('email')?.touched">
          Inserisci una email valida.
        </div>
      </form>

      <form *ngIf="step === 2" [formGroup]="formStep2" class="step-form">
        <label>
          Colore preferito dello Shiba
          <select formControlName="shibaColor">
            <option value="">Seleziona...</option>
            <option value="sesamo">Sesamo</option>
            <option value="aka">Rosso (Aka)</option>
            <option value="nero">Nero</option>
          </select>
        </label>

        <label>
          Esperienza con cani
          <select formControlName="experience">
            <option value="">Seleziona...</option>
            <option value="nessuna">Nessuna</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </label>

        <label>
          Note aggiuntive
          <textarea formControlName="notes" rows="3" placeholder="Raccontaci qualcosa di te..."></textarea>
        </label>
      </form>

      <div *ngIf="step === 3" class="summary">
        <h2>Riepilogo finale</h2>
        <div class="summary-card">
            <p><strong>Nome:</strong> {{ formStep1.value.nome }}</p>
            <p><strong>Email:</strong> {{ formStep1.value.email }}</p>
            <p><strong>Colore Shiba:</strong> {{ formStep2.value.shibaColor | uppercase }}</p>
            <p><strong>Esperienza:</strong> {{ formStep2.value.experience | titlecase }}</p>
            <p><strong>Note:</strong> {{ formStep2.value.notes || '-' }}</p>
        </div>
      </div>

      <div class="buttons">
        <button type="button" class="btn-prev" (click)="prev()" [disabled]="step === 1">Indietro</button>
        <button type="button" class="btn-next" *ngIf="!isLastStep" (click)="next()">Avanti</button>
        <button type="button" class="btn-submit" *ngIf="isLastStep" (click)="submit()">Invia Richiesta</button>
      </div>

      <div class="back-link">
        <a [routerLink]="['/']">⬅ Torna alla Home</a>
      </div>
    </section>
  `,
  styles: [`
    .wizard-container { 
      max-width: 700px; 
      margin: 3rem auto; 
      padding: 3rem; 
      background: white; 
      border-radius: 20px; 
      box-shadow: 0 15px 35px rgba(0,0,0,0.1);
      font-family: 'Inter', sans-serif;
    }

    /* STILE DIDASCALIA */
    .intro-section {
      background: #fdf2f2;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      position: relative;
      overflow: hidden;
    }
    .accent-bar {
      position: absolute;
      top: 0; left: 0;
      width: 5px; height: 100%;
      background: #a72828ff;
    }
    .intro-title {
      color: #502c2c;
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      font-weight: 800;
    }
    .intro-text {
      color: #666;
      line-height: 1.6;
      font-size: 0.95rem;
      margin: 0;
    }

    h1 { color: #1a1a1a; font-weight: 900; margin-bottom: 0.5rem; }
    .step-subtitle { color: #888; margin-bottom: 2rem; }

    .steps-indicator { 
      display: flex; 
      justify-content: space-between; 
      margin: 2.5rem 0; 
      gap: 10px;
    }
    .steps-indicator > div { 
      flex: 1;
      text-align: center;
      padding: 0.7rem; 
      border-radius: 50px; 
      background: #f5f5f5; 
      font-size: 0.85rem;
      color: #999;
      transition: 0.3s;
    }
    .steps-indicator .active { 
      background: #a72828ff; 
      color: white; 
      box-shadow: 0 4px 10px rgba(167, 40, 40, 0.3);
    }

    .step-form label { 
      display: block; 
      margin: 1.5rem 0 0.5rem; 
      font-weight: 700;
      color: #502c2c;
    }
    .step-form input, .step-form select, .step-form textarea { 
      width: 100%; 
      padding: 1rem; 
      border: 2px solid #eee; 
      border-radius: 10px; 
      font-family: inherit;
      transition: 0.3s;
    }
    .step-form input:focus { border-color: #a72828ff; outline: none; }

    .error { color: #d32f2f; font-size: 0.85rem; margin-top: 0.5rem; font-weight: 600; }
    
    .buttons { 
      display: flex; 
      gap: 1rem; 
      justify-content: flex-end; 
      margin-top: 3rem; 
    }
    .buttons button { 
      padding: 1rem 2.5rem; 
      border: none; 
      border-radius: 12px; 
      font-weight: 700;
      cursor: pointer; 
      transition: 0.3s;
    }
    .btn-prev { background-color: #eee; color: #666; }
    .btn-next, .btn-submit { 
      background-color: #a72828ff; 
      color: white; 
    }
    .btn-submit:hover, .btn-next:hover { transform: translateY(-2px); filter: brightness(1.1); }
    .buttons button:disabled { background: #ccc; transform: none; cursor: not-allowed; }

    .summary-card {
      background: #fafafa;
      padding: 1.5rem;
      border-radius: 15px;
      border: 1px solid #eee;
    }
    .back-link { margin-top: 2rem; text-align: center; }
    .back-link a { color: #888; text-decoration: none; font-size: 0.9rem; }
  `]
})
export class AdozioneWizardComponent {
  // ... (Tutta la logica rimane uguale al tuo file originale)
  step = 1;
  formStep1: FormGroup;
  formStep2: FormGroup;

  get isLastStep() { return this.step === 3; }

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private dataService: DataService 
  ) {
    this.formStep1 = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.formStep2 = this.fb.group({
      shibaColor: ['', Validators.required],
      experience: ['', Validators.required],
      notes: ['']
    });
  }

  next() {
    if (this.step === 1 && this.formStep1.invalid) {
      this.formStep1.markAllAsTouched();
      return;
    }
    if (this.step === 2 && this.formStep2.invalid) {
      this.formStep2.markAllAsTouched();
      return;
    }
    if (this.step < 3) this.step++;
  }

  prev() {
    if (this.step > 1) this.step--;
  }

  submit() {
    const payload = { ...this.formStep1.value, ...this.formStep2.value };
    this.dataService.salvaAdozione(payload).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => alert('Errore di comunicazione con il server.')
    });
  }
}