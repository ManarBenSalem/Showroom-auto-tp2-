import { Injectable } from '@angular/core';
import { Auto } from '../interfaces/auto';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private storageKey = 'showroom-favorites';

  constructor() { }

  getFavorites(): Auto[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  toggleFavorite(auto: Auto): Auto {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(f => f.id === auto.id);

    if (index === -1) {
      const autoWithFavorite = { ...auto, favorite: true };
      favorites.push(autoWithFavorite);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
      return autoWithFavorite;
    } else {
      favorites.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
      return { ...auto, favorite: false };
    }
  }

  isFavorite(auto: Auto): boolean {
    const favorites = this.getFavorites();
    return favorites.some(f => f.id === auto.id);
  }

  getFavoriteCount(): number {
    return this.getFavorites().length;
  }

  clearFavorites(): void {
    localStorage.removeItem(this.storageKey);
  }
}