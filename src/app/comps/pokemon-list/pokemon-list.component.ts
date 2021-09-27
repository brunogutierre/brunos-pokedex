import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RemotePokemonService } from 'src/app/servs/remote-pokemon.service';
import { Pokemon } from 'src/app/types/pokemon';
import { Util } from 'src/app/util/Util';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  pokemonCount: number = 0;
  page: number = 0;

  @Output() detailEmitter = new EventEmitter<any>();

  constructor(private remotePokemonService: RemotePokemonService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.remotePokemonService.getPokemonSpecies(this.page).subscribe(list => {
      if (list && list.results){
        this.pokemonCount = list.count;
        this.pokemons = [];

        list.results.forEach((pokemon:any, index:number) => {
          this.remotePokemonService.getPokemon(Util.getIdFromUrl(pokemon.url) || '').subscribe(poke => {
            this.pokemons[index] = poke;
          })
        });
      }
    })
  }

  showPokemon(pokemon: any) {
    this.detailEmitter.emit(pokemon);
  }

  nextPage() {
    if (!this.isLastPage()) {
      this.page += 1;
      this.refreshList();
    }
  }

  prevPage() {
    if (!this.isFirstPage()) {
      this.page -= 1;
      this.refreshList();
    }
  }

  firstPage() {
    if (!this.isFirstPage()) {
      this.page = 0;
      this.refreshList();
    }
  }

  lastPage() {
    if (!this.isLastPage()) {
      this.page = this.getLastPage();
      this.refreshList();
    }
  }

  toPage(page: number) {
    if (page != this.page) {
      this.page = Math.min(Math.max(0, page), this.getLastPage());
      this.refreshList();
    }
  }

  isLastPage(): boolean {
    return (this.page + 1) * this.remotePokemonService.pageSize > this.pokemonCount;
  }

  isFirstPage(): boolean {
    return this.page <= 0;
  }

  getLastPage(): number {
    return Math.floor(this.pokemonCount / this.remotePokemonService.pageSize);
  }
}
