import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pokemon } from '../types/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeComunicationService {
  pokeObserver = new Subject();
  public subscriber$ = this.pokeObserver.asObservable();

  changePokemon(pokemon: Pokemon | null) {
    this.pokeObserver.next(pokemon);
  }
}
