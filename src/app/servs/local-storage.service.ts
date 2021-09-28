import { Injectable } from '@angular/core';
import { Pokemon } from '../types/pokemon';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  DB_NAME: string = 'pokemon-local-reference';
  localDB: any = {};

  constructor() {
    this.localDB = JSON.parse(localStorage.getItem(this.DB_NAME) || '{}');
  }

  getPokemon(id: string): any {
    return this.localDB[id];
  }

  savePokemon(pokemon: Pokemon) {
    if (pokemon && !this.localDB[pokemon.id]){
      this.localDB[pokemon.id] = pokemon;
      localStorage.setItem(this.DB_NAME, JSON.stringify(this.localDB));
    }
  }
}
