import { Component, OnInit } from '@angular/core'; 
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
  evolution: any;

  constructor(private remotePokemonService: RemotePokemonService, private pokeComunicationService: PokeComunicationService) {

  }

  ngOnInit(): void {
    this.pokeComunicationService.subscriber$.subscribe(pokemon => {
      if (pokemon instanceof Pokemon || pokemon === null)
        this.setPokemon(pokemon);
    });
  }

  public setPokemon(pokemon: Pokemon | null) {
    this.pokemon = pokemon;

    if (this.pokemon) {
      if (!this.pokemon.hasSpecies()) {
        this.remotePokemonService.getPokemonSpecie(this.pokemon.name).subscribe(specie => {
          this.pokemon?.setSpecies(specie);
        })
      }

      if (this.pokemon.evolution_id) {
        this.remotePokemonService.getEvolutionChain(this.pokemon.evolution_id).subscribe(evo => {
          this.evolution = evo;
        });
      }
    }
  }

  close(): void {
    this.setPokemon(null);
  }

  getBestImagem(): string {
    // TODO: img default
    return this.pokemon?.url_image || '';
  }
}