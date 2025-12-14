import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-search-bar',
  imports: [CurrencyPipe, NgClass, NgStyle],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar {
  @Input() autos: Auto[] = []

  @Output() onSelectAuto = new EventEmitter<Auto>()

  selectedAutos: Auto[] = []

  constructor(private favoriteService: FavoriteService) {}

  selectAutoList(brand: string) {
    this.selectedAutos = this.autos.filter(x =>
      x.brand.toLowerCase().startsWith(brand.toLowerCase()))
    
    // Initialiser la propriété favorite pour chaque voiture
    this.selectedAutos.forEach(auto => {
      auto.favorite = this.favoriteService.isFavorite(auto);
    });
  }

  // NOUVELLE MÉTHODE : Basculer le statut favori
  toggleFavorite(auto: Auto) {
    const updatedAuto = this.favoriteService.toggleFavorite(auto);
    
    // Mettre à jour l'objet dans la liste filtrée
    const index = this.selectedAutos.findIndex(a => a.id === auto.id);
    if (index !== -1) {
      this.selectedAutos[index].favorite = updatedAuto.favorite;
    }
    
    // Mettre à jour aussi dans la liste principale (autos)
    const mainIndex = this.autos.findIndex(a => a.id === auto.id);
    if (mainIndex !== -1) {
      this.autos[mainIndex].favorite = updatedAuto.favorite;
    }
  }

  showDetails(auto: Auto) {
    this.onSelectAuto.emit(auto)
  }

  autoTitleStyle(auto: Auto) {
    if (auto.power >= 10)
      return { 'color': 'red' }
    else
      return { 'color': 'black' }
  }
}