import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import { tap, map } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import { LocalStorageService } from './local-storage.service';
import { Pokemon } from '../types/pokemon';

@Injectable({
  providedIn: 'root'
})
export class RemotePokemonService {
  private urlBase = '/api/';
  public pageSize: number = 5;

  constructor(private httpClient: HttpClient, private localStoreService: LocalStorageService) { }

  getPokemon(id: string): Observable<Pokemon> {
    let pokemon = this.localStoreService.getPokemon(id);

    if (!pokemon) {
      return this.httpClient.get(this.urlBase + 'pokemon/' + id).pipe(
        map(p => new Pokemon(p)),
        tap(p => {this.getPokemonSpecie(p.species_id).subscribe(s => {
          p.setSpecies(s);
          this.localStoreService.savePokemon(p);
        })}));
    }
    else {
      return of(pokemon);
    }
  }

  getPokemons(page: number = 0, limit: number = this.pageSize): Observable<any> {
    return this.httpClient.get(this.urlBase + `pokemon/?offset=${page * this.pageSize}&limit=${limit}`)
  }

  getPokemonSpecie(id: string | number): Observable<any> {
    return this.httpClient.get(this.urlBase + 'pokemon-species/' + id);
  }

  getPokemonSpecies(page: number = 0, limit: number = this.pageSize): Observable<any> {
    return this.httpClient.get(this.urlBase + `pokemon-species/?offset=${page * this.pageSize}&limit=${limit}`);
  }

  getEvolutionChain(id: string | number): Observable<any> {
    return this.httpClient.get(this.urlBase + 'evolution-chain/' + id);
  }
}
