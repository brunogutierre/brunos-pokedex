import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FullPokemonListService } from 'src/app/servs/full-pokemon-list.service';
import { RemotePokemonService } from 'src/app/servs/remote-pokemon.service';
import { Pokemon } from 'src/app/types/pokemon';
import { PokemonSimple } from 'src/app/types/pokemonSimple';
import { Util } from 'src/app/util/Util';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: (Pokemon | null)[] = [];
  pokemonCount: number = 0;
  page: number = 0;

  @ViewChild('inputfilter') inputFilter: any; 
  codSearch: any;
  filteredList: PokemonSimple[] = [];

  @Output() detailEmitter = new EventEmitter<any>();

  constructor(private remotePokemonService: RemotePokemonService, private fullPokemonListService: FullPokemonListService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    if (this.inputFilter && this.inputFilter.nativeElement.value) {
      this.refreshListWithFilter();
    }
    else {
      this.refreshListRemote();
    }
  }

  refreshListRemote() {
    this.remotePokemonService.getPokemonSpecies(this.page).subscribe(list => {
      if (list && list.results){
        this.pokemonCount = list.count;
        this.pokemons = [];

        list.results.forEach((pokemon:any, index:number) => {
          this.pokemons[index] = null;

          this.remotePokemonService.getPokemon(Util.getIdFromUrl(pokemon.url) || '').subscribe(poke => {
            this.pokemons[index] = poke;
          })
        });
      }
    })
  }

  refreshListWithFilter() {
    if (this.page > this.getLastPage()) {
      this.page = this.getLastPage();
    }

    this.pokemons = [];
    let results = this.filteredList.slice(this.remotePokemonService.pageSize * this.page, this.remotePokemonService.pageSize * (this.page + 1));

    results.forEach((pokemon:any, index:number) => {
      this.pokemons[index] = null;

      this.remotePokemonService.getPokemon(Util.getIdFromUrl(pokemon.url) || '').subscribe(poke => {
        this.pokemons[index] = poke;
      })
    });
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
    return (this.page + 1) * this.remotePokemonService.pageSize >= this.pokemonCount;
  }

  isFirstPage(): boolean {
    return this.page <= 0;
  }

  getLastPage(): number {
    return Math.floor((this.pokemonCount -1) / this.remotePokemonService.pageSize);
  }

  setPage(event: any): void {
    if (event && event.keyCode === 13) {
      this.toPage(parseInt(event.target.value) - 1);
    }
    else if (parseInt(event.target.value) > this.getLastPage()) {
      this.page = this.getLastPage();
    }
  }

  filterSearch(event: any): void {
    let text = event.target.value;

    if (this.codSearch) {
      clearTimeout(this.codSearch);
      this.codSearch = null;
    }

    this.codSearch = setTimeout(() => {
      this.filteredList = this.fullPokemonListService.searchPokemon(text);
      this.pokemonCount = this.filteredList.length;
      this.codSearch = null;
      this.refreshList();
    }, 500);
  }
}
