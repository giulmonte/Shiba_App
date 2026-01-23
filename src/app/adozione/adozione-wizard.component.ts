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
      <h1>Adozione Shiba-Inu</h1>
      <p>Completa i passaggi per inviare la tua richiesta al nostro server.</p>

      <div class="steps-indicator">
        <div [class.active]="step >= 1">1. Dati personali</div>
        <div [class.active]="step >= 2">2. Preferenze Shiba</div>
        <div [class.active]="step >= 3">3. Riepilogo</div>
      </div>

      <form *ngIf="step === 1" [formGroup]="formStep1" class="step-form">
        <label>
          Nome
          <input type="text" formControlName="nome">
        </label>
        <div class="error" *ngIf="formStep1.get('nome')?.invalid && formStep1.get('nome')?.touched">
          Il nome è obbligatorio.
        </div>

        <label>
          Email
          <input type="email" formControlName="email">
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
          <textarea formControlName="notes" rows="3"></textarea>
        </label>
      </form>

      <div *ngIf="step === 3" class="summary">
        <h2>Riepilogo finale</h2>
        <p><strong>Nome:</strong> {{ formStep1.value.nome }}</p>
        <p><strong>Email:</strong> {{ formStep1.value.email }}</p>
        <p><strong>Colore Shiba:</strong> {{ formStep2.value.shibaColor }}</p>
        <p><strong>Esperienza:</strong> {{ formStep2.value.experience }}</p>
        <p><strong>Note:</strong> {{ formStep2.value.notes || '-' }}</p>
      </div>

      <div class="buttons">
        <button type="button" (click)="prev()" [disabled]="step === 1">Indietro</button>
        <button type="button" *ngIf="!isLastStep" (click)="next()">Avanti</button>
        <button type="button" *ngIf="isLastStep" (click)="submit()">Invia a Flask</button>
      </div>

      <div class="back-link">
        <a [routerLink]="['/']">⬅ Torna alla Home</a>
      </div>
    </section>
  `,
  styles: [`
    .wizard-container { 
      max-width: 600px; 
      margin: 2rem auto; 
      padding: 2rem; 
      background: white; 
      border-radius: 12px; 
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .steps-indicator { 
      display: flex; 
      justify-content: space-between; 
      margin: 2rem 0; 
      font-weight: bold; 
    }
    .steps-indicator > div { 
      padding: 0.5rem 1rem; 
      border-radius: 20px; 
      background: #eee; 
    }
    .steps-indicator .active { 
      background: #a72828ff; 
      color: white; 
    }
    .step-form label { 
      display: block; 
      margin: 1rem 0; 
    }
    .step-form input, .step-form select, .step-form textarea { 
      width: 100%; 
      padding: 0.8rem; 
      border: 1px solid #ddd; 
      border-radius: 6px; 
      margin-top: 0.3rem; 
    }
    .error { color: red; font-size: 0.9rem; margin-top: 0.3rem; }
    .buttons { 
      display: flex; 
      gap: 1rem; 
      justify-content: flex-end; 
      margin: 2rem 0; 
    }
    .buttons button { 
      padding: 0.8rem 2rem; 
      border: none; 
      border-radius: 6px; 
      cursor: pointer; 
      background-color: #f0f0f0;
    }
    .buttons button:last-child {
      background-color: #a72828ff;
      color: white;
    }
    .buttons button:disabled { background: #ccc; }
    .summary { margin: 2rem 0; }
    .summary p { margin: 1rem 0; }
  `]
})
export class AdozioneWizardComponent {
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
        console.log('Risposta dal server:', response);
        alert('Richiesta salvata su Flask con successo! 🐕');
        
        this.formStep1.reset();
        this.formStep2.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Errore durante l\'invio a Flask:', err);
        alert('Errore: non è stato possibile comunicare con il server Flask.');
      }
    });
  }
}