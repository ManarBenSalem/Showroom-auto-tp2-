import { Component, Output, EventEmitter } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-head-bar',
  imports: [],
  templateUrl: './head-bar.html',
  styleUrl: './head-bar.css'
})
export class HeadBar {
  favoriteCount: number = 0;
  
  // ÉVÉNEMENT POUR COMMUNIQUER AVEC LE PARENT
  @Output() viewChanged = new EventEmitter<'search' | 'favorites'>();

  constructor(private favoriteService: FavoriteService) {
    this.updateFavoriteCount();
    
    // Mettre à jour le compteur toutes les secondes
    setInterval(() => {
      this.updateFavoriteCount();
    }, 1000);
  }

  updateFavoriteCount() {
    this.favoriteCount = this.favoriteService.getFavoriteCount();
  }

  // MÉTHODES POUR CHANGER DE VUE
  showFavorites() {
    this.viewChanged.emit('favorites');
  }

  showSearch() {
    this.viewChanged.emit('search');
  }
}