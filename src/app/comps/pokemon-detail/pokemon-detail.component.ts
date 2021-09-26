import { Component, OnInit } from '@angular/core'; 
import { RemotePokemonService } from 'src/app/servs/remote-pokemon.service';
import { Pokemon } from 'src/app/types/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;

  constructor(private remotePokemonService: RemotePokemonService) {

  }

  ngOnInit(): void {

  }

  public setPokemon(pokemon: Pokemon) {
    this.pokemon = pokemon;

    if (!this.pokemon.hasSpecies()) {
      this.remotePokemonService.getPokemonSpecie(this.pokemon.name).subscribe(specie => {
        this.pokemon?.setSpecies(specie);
      })
    }
  }

  getBestImagem(): string {
    // TODO: img default
    return this.pokemon?.url_image || '';
  }
}