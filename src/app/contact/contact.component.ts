import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup; 

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]), 
      messaggio: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Inviato con successo!', this.contactForm.value);
      alert('Messaggio inviato! Controlla la console per i dati.');
      this.contactForm.reset();
    } else {
      console.log('Form non valido!');
      alert('Per favore, compila tutti i campi correttamente.');
    }
  }
}