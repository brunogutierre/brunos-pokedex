import { Component, OnInit } from '@angular/core'; 
import { FullPokemonListService } from 'src/app/servs/full-pokemon-list.service';
import { PokeComunicationService } from 'src/app/servs/poke-comunication.service';
import { RemotePokemonService } from 'src/app/servs/remote-pokemon.service';
import { Pokemon } from 'src/app/types/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;
  prevPokemonId: number | null = null;
  nextPokemonId: number | null = null;
  evolution: any;

  constructor(private remotePokemonService: RemotePokemonService, private pokeComunicationService: PokeComunicationService, private fullPokemonListService: FullPokemonListService) {

  }

  ngOnInit(): void {
    this.pokeComunicationService.subscriber$.subscribe(pokemon => {
      if (pokemon instanceof Pokemon || pokemon === null)
        this.setPokemon(pokemon);
    });
  }

  public setPokemon(pokemon: Pokemon | null) {
    this.pokemon = pokemon;
    this.evolution = null;

    if (this.pokemon) {
      if (!this.pokemon.hasSpecies()) {
        this.remotePokemonService.getPokemonSpecie(this.pokemon.species_id).subscribe(specie => {
          this.pokemon?.setSpecies(specie);
          this.retreveEvolution()
        })
      }
      else {
        this.retreveEvolution()
      }

      this.nextPokemonId = this.fullPokemonListService.getNextPokemon(this.pokemon?.id || 0);
      this.prevPokemonId = this.fullPokemonListService.getPrevPokemon(this.pokemon?.id || 0);
    }
    else {
      this.prevPokemonId = null;
      this.nextPokemonId = null;
    }
  }

  retreveEvolution() {
    if (this.pokemon?.evolution_id) {
      this.remotePokemonService.getEvolutionChain(this.pokemon.evolution_id).subscribe(evo => {
        this.evolution = evo;
      });
    }
  }

  nextPokemon() {
    if (this.nextPokemonId) {
      this.remotePokemonService.getPokemon(this.nextPokemonId + '').subscribe(poke => {
        this.setPokemon(poke);
      })
    }
  }

  prevPokemon() {
    if (this.prevPokemonId) {
      this.remotePokemonService.getPokemon(this.prevPokemonId + '').subscribe(poke => {
        this.setPokemon(poke);
      })
    }
  }

  close(): void {
    this.setPokemon(null);
  }

  getBestImagem(): string {
    return this.pokemon?.url_image || '';
  }
}