import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true, // ← AJOUTER CETTE LIGNE
  imports: [CommonModule, RouterModule], // ← AJOUTER LES IMPORTS
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  appName: string = 'Showroom Auto';
  developer: string = 'Votre Nom';

  ngOnInit(): void {
    // Logique d'initialisation si nécessaire
  }
}