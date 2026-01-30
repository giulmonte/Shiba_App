import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../data.service';

@Component({
  selector: 'app-prova',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    CommonModule, 
    RouterLink, 
    FormsModule
  ],
  templateUrl: './prova.component.html',
  styleUrl: './prova.component.css'
})
export class ProvaComponent implements OnInit {
  private dataService = inject(DataService);

  loadingAnalysis = false;
  analysisMessage = '';
  latestReview: any = null;

  ngOnInit(): void {
  }
}