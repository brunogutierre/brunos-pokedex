import { Injectable } from '@angular/core';

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

  savePokemon(pokemon: any) {
    if (pokemon && !this.localDB[pokemon.name]){
      this.localDB[pokemon.name] = pokemon;
      // TODO: reduce size of data
      // localStorage.setItem(this.DB_NAME, JSON.stringify(this.localDB));
    }
  }
}
