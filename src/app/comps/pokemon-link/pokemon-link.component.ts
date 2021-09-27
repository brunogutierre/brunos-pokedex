import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PokeComunicationService } from 'src/app/servs/poke-comunication.service';
import { RemotePokemonService } from 'src/app/servs/remote-pokemon.service';
import { Pokemon } from 'src/app/types/pokemon';

@Component({
  selector: 'app-pokemon-link',
  templateUrl: './pokemon-link.component.html',
  styleUrls: ['./pokemon-link.component.scss']
})
export class PokemonLinkComponent implements OnInit, OnChanges {
  @Input() id: number | string | null = null;

  pokemon: Pokemon | null = null;

  constructor(private remotePokemonService: RemotePokemonService, private pokeComunicationService: PokeComunicationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.id) {
      this.remotePokemonService.getPokemon(this.id + '').subscribe(poke => {
        this.pokemon = poke;
      });
    }
  }

  showDetails() {
    this.pokeComunicationService.changePokemon(this.pokemon);
  }
}
