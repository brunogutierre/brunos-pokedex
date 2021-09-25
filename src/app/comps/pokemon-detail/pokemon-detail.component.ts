import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  public setPokemon(pokemon: any) {
    this.pokemon = pokemon;
  }

  getBestImagem(): string {
    if (this.pokemon){
      if (this.pokemon.sprites.other.dream_world.front_default)
        return this.pokemon.sprites.other.dream_world.front_default;
      else if (this.pokemon.sprites.other['official-artwork'].front_default)
        return this.pokemon.sprites.other['official-artwork'].front_default;
      else if (this.pokemon.sprites.front_default)
        return this.pokemon.sprites.front_default;
    }

    return '';
  }
}