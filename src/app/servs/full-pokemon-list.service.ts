import { Injectable } from '@angular/core';
import { PokemonSimple } from '../types/pokemonSimple';
import { Util } from '../util/Util';
import { RemotePokemonService } from './remote-pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class FullPokemonListService {
  pokemonList: PokemonSimple[] = [];

  constructor(private remotePokemonService: RemotePokemonService) {
    this.remotePokemonService.getPokemonSpecies(0, 1000).subscribe(lista => {
      this.pokemonList = lista.results.map((item: { name: any; url: string; }) => {
        return {name: item.name, url: item.url, id: parseInt(Util.getIdFromUrl(item.url) || '0') };
      })
    });
  }

  getList(): PokemonSimple[] {
    return this.getList();
  }

  getNextPokemon(id: number): number | null {
    let next: number | null = null;

    for (let index = 0; index < this.pokemonList.length - 1; index++) {
      if (this.pokemonList[index].id && this.pokemonList[index].id === id){
        next = this.pokemonList[index+1].id || null;
        break;
      }
    }

    return next;
  }

  getPrevPokemon(id: number): number | null {
    let prev: number | null = null;

    for (let index = 1; index < this.pokemonList.length; index++) {
      if (this.pokemonList[index].id && this.pokemonList[index].id === id){
        prev = this.pokemonList[index-1].id || null;
        break;
      }
    }

    return prev;
  }

  searchPokemon(word: string): PokemonSimple[] {
    return this.pokemonList.filter(pc => pc.name? pc.name.indexOf(word.toLowerCase()) >= 0 : false);
  }

  getPageLocation(id: number, pageSize: number): number {
    let page = 0;

    for (let index = 0; index < this.pokemonList.length; index++) {
      if (this.pokemonList[index].id && this.pokemonList[index].id === id){
        page = Math.floor(index / pageSize);
        break;
      }
    }

    return page;
  }
}
