import { Component, OnInit } from '@angular/core';
import { Auto } from '../../interfaces/auto';
import { FavoriteService } from '../../services/favorite.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CurrencyPipe],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class FavoritesComponent implements OnInit {
  favoriteAutos: Auto[] = [];
  totalPrice: number = 0;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteAutos = this.favoriteService.getFavorites();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.favoriteAutos.reduce((sum, auto) => sum + auto.price, 0);
  }

  removeFromFavorites(auto: Auto): void {
    this.favoriteService.toggleFavorite(auto);
    this.loadFavorites();
  }

  clearAllFavorites(): void {
    if (confirm('Voulez-vous vraiment supprimer tous vos favoris ?')) {
      this.favoriteService.clearFavorites();
      this.favoriteAutos = [];
      this.totalPrice = 0;
    }
  }
}